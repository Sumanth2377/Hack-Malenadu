import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize the Twilio Client (used only for SMS now)
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { machine_id, anomaly, risk_score } = body;

    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    const toNumber = process.env.TARGET_PHONE_NUMBER;
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    const agentPhoneNumberId = process.env.ELEVENLABS_PHONE_NUMBER_ID;

    // We now require the ElevenLabs explicit keys based on the native deployment approach
    if (!fromNumber || !toNumber || !agentId || !elevenLabsApiKey || !agentPhoneNumberId) {
      return NextResponse.json(
        { error: 'Missing necessary environment variables (.env.local setup: ELEVENLABS_API_KEY, ELEVENLABS_PHONE_NUMBER_ID needed)' },
        { status: 500 }
      );
    }

    // 1. Send SMS Alert via Twilio SDK
    // Removed brackets and complex punctuation that often trigger India's strict DLT carrier spam filters on Twilio trial numbers
    const messagePromise = client.messages.create({
      body: `CareSyn AI: Issue detected on ${machine_id || 'system'}. Anomaly: ${anomaly || 'Unknown'}. Please open dashboard to halt machine.`,
      from: fromNumber,
      to: toNumber,
    });

    // 2. Initiate Phone Call connecting to ElevenLabs Agent Natively
    const callPromise = fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
      method: "POST",
      headers: {
        "xi-api-key": elevenLabsApiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        agent_id: agentId,
        agent_phone_number_id: agentPhoneNumberId,
        to_number: toNumber,
        conversation_initiation_client_data: {
          dynamic_variables: {
            company_name: "CareSyn AI",
            issue: anomaly || "Critical temperature spike in the Main Compressor",
            timeframe: "within the next 45 minutes",
            impact: "a potential system shutdown",
            confidence: `${risk_score || 90}% confidence`,
            action: "immediately log into the CareSyn dashboard to approve a maintenance halt"
          }
        }
      })
    });

    // Execute both in parallel
    const [messageParams, callResp] = await Promise.all([messagePromise, callPromise]);

    if (!callResp.ok) {
      const errorText = await callResp.text();
      throw new Error(`ElevenLabs Native API HTTP error ${callResp.status}: ${errorText}`);
    }

    const callData = await callResp.json();
    console.log("ElevenLabs API Response:", JSON.stringify(callData, null, 2));

    // ElevenLabs sometimes wraps Twilio errors in HTTP 200 responses
    if (callData.success === false) {
      const msg = callData.message || "Unknown Twilio/ElevenLabs error";
      throw new Error(`ElevenLabs Twilio Setup Failure: ${msg}`);
    }

    return NextResponse.json({
      success: true,
      message_sid: messageParams.sid,
      call_data: callData,
      status: 'Call and SMS triggered successfully via Native ElevenLabs hook',
    });
  } catch (error: any) {
    console.error('Trigger alert error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to trigger alert' },
      { status: 500 }
    );
  }
}
