import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize the Twilio Client
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

    if (!fromNumber || !toNumber || !agentId) {
      return NextResponse.json(
        { error: 'Missing necessary environment variables (.env.local setup)' },
        { status: 500 }
      );
    }

    // 1. Send SMS Alert
    const messagePromise = client.messages.create({
      body: `[CareSyn AI ALERT] Issue detected on ${machine_id || 'system'}. Risk Score: ${risk_score || 'High'}. Details: ${anomaly || 'Unknown anomaly'}. Please check dashboard immediately.`,
      from: fromNumber,
      to: toNumber,
    });

    // 2. Initiate Phone Call connecting to ElevenLabs Agent
    // Twilio Media Streams XML (TwiML) to bridge the call audio directly to ElevenLabs AI Agent
    const twiml = `
      <Response>
        <Connect>
          <Stream url="wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}" />
        </Connect>
      </Response>
    `;

    const callPromise = client.calls.create({
      twiml: twiml,
      to: toNumber,
      from: fromNumber,
    });

    // Execute both in parallel
    const [messageParams, callParams] = await Promise.all([messagePromise, callPromise]);

    return NextResponse.json({
      success: true,
      message_sid: messageParams.sid,
      call_sid: callParams.sid,
      status: 'Call and SMS triggered successfully',
    });
  } catch (error: any) {
    console.error('Trigger alert error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to trigger alert' },
      { status: 500 }
    );
  }
}
