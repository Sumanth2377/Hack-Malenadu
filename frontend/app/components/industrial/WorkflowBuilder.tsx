'use client';

import { useState } from 'react';
import { TriggerStage } from './workflow/TriggerStage';
import { CallEngineerStage } from './workflow/CallEngineerStage';
import { SendReportStage } from './workflow/SendReportStage';
import { LogStage } from './workflow/LogStage';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface WorkflowState {
  trigger: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    machineId: string;
  };
  callEngineer: {
    engineerName: string;
    engineerRole: string;
    status: 'idle' | 'calling' | 'connected' | 'failed';
  };
  sendReport: {
    reportType: string;
    sendVia: 'sms' | 'email' | 'notification';
    status: 'idle' | 'sending' | 'success' | 'failed';
  };
  logs: Array<{
    id: string;
    timestamp: string;
    type: string;
    message: string;
    status: 'success' | 'warning' | 'error' | 'info';
  }>;
}

export function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState<WorkflowState>({
    trigger: {
      riskLevel: 'medium',
      machineId: '',
    },
    callEngineer: {
      engineerName: '',
      engineerRole: '',
      status: 'idle',
    },
    sendReport: {
      reportType: 'Auto-generated Maintenance Report',
      sendVia: 'email',
      status: 'idle',
    },
    logs: [],
  });

  const [activeStage, setActiveStage] = useState<number>(0);

  const updateTrigger = (data: Partial<WorkflowState['trigger']>) => {
    setWorkflow((prev) => ({
      ...prev,
      trigger: { ...prev.trigger, ...data },
    }));
  };

  const updateCallEngineer = (data: Partial<WorkflowState['callEngineer']>) => {
    setWorkflow((prev) => ({
      ...prev,
      callEngineer: { ...prev.callEngineer, ...data },
    }));
  };

  const updateSendReport = (data: Partial<WorkflowState['sendReport']>) => {
    setWorkflow((prev) => ({
      ...prev,
      sendReport: { ...prev.sendReport, ...data },
    }));
  };

  const addLog = (log: Omit<WorkflowState['logs'][0], 'id' | 'timestamp'>) => {
    const newLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    setWorkflow((prev) => ({
      ...prev,
      logs: [newLog, ...prev.logs],
    }));
  };

  const executeWorkflow = async () => {
    // Reset statuses
    updateCallEngineer({ status: 'idle' });
    updateSendReport({ status: 'idle' });
    setActiveStage(0);

    // Stage 1: Trigger detected
    addLog({
      type: 'Trigger',
      message: `Risk detected: ${workflow.trigger.riskLevel.toUpperCase()} on Machine ${workflow.trigger.machineId}`,
      status: 'warning',
    });
    setActiveStage(1);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Stage 2: Call Engineer
    updateCallEngineer({ status: 'calling' });
    addLog({
      type: 'Action',
      message: `Calling engineer: ${workflow.callEngineer.engineerName}`,
      status: 'info',
    });
    setActiveStage(2);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const callSuccess = Math.random() > 0.2; // 80% success rate
    if (callSuccess) {
      updateCallEngineer({ status: 'connected' });
      addLog({
        type: 'Action',
        message: `Successfully connected to ${workflow.callEngineer.engineerName}`,
        status: 'success',
      });
    } else {
      updateCallEngineer({ status: 'failed' });
      addLog({
        type: 'Action',
        message: `Failed to reach ${workflow.callEngineer.engineerName}`,
        status: 'error',
      });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Stage 3: Send Report
    updateSendReport({ status: 'sending' });
    addLog({
      type: 'Action',
      message: `Sending ${workflow.sendReport.reportType} via ${workflow.sendReport.sendVia}`,
      status: 'info',
    });
    setActiveStage(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    updateSendReport({ status: 'success' });
    addLog({
      type: 'Action',
      message: `Report sent successfully via ${workflow.sendReport.sendVia}`,
      status: 'success',
    });

    setActiveStage(4);
    addLog({
      type: 'Completion',
      message: 'Workflow completed successfully',
      status: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-white rounded-xl p-6 border border-[#E6DFD0]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2C2416]">
              Workflow Pipeline
            </h2>
            <p className="text-sm text-[#6B5E4F] mt-1">
              Configure and execute automated maintenance workflows
            </p>
          </div>
          <Button
            onClick={executeWorkflow}
            disabled={
              !workflow.trigger.machineId ||
              !workflow.callEngineer.engineerName ||
              workflow.callEngineer.status === 'calling' ||
              workflow.sendReport.status === 'sending'
            }
            className="bg-gradient-to-r from-[#C8B896] to-[#A69776] hover:from-[#A69776] hover:to-[#8B7D61] text-[#2C2416] font-medium px-6"
          >
            Execute Workflow
          </Button>
        </div>
      </div>

      {/* Workflow Stages */}
      <div className="bg-white rounded-xl p-8 border border-[#E6DFD0]">
        <div className="flex items-start gap-6 overflow-x-auto pb-4">
          {/* Stage 1: Trigger */}
          <div className="flex-shrink-0 w-80">
            <TriggerStage
              data={workflow.trigger}
              onChange={updateTrigger}
              isActive={activeStage === 1}
            />
          </div>

          {/* Arrow */}
          <div className="flex items-center pt-24 flex-shrink-0">
            <ArrowRight
              className={`w-8 h-8 transition-colors ${
                activeStage >= 2 ? 'text-[#C8B896]' : 'text-[#E6DFD0]'
              }`}
            />
          </div>

          {/* Stage 2: Call Engineer */}
          <div className="flex-shrink-0 w-80">
            <CallEngineerStage
              data={workflow.callEngineer}
              onChange={updateCallEngineer}
              isActive={activeStage === 2}
              addLog={addLog}
            />
          </div>

          {/* Arrow */}
          <div className="flex items-center pt-24 flex-shrink-0">
            <ArrowRight
              className={`w-8 h-8 transition-colors ${
                activeStage >= 3 ? 'text-[#C8B896]' : 'text-[#E6DFD0]'
              }`}
            />
          </div>

          {/* Stage 3: Send Report */}
          <div className="flex-shrink-0 w-80">
            <SendReportStage
              data={workflow.sendReport}
              onChange={updateSendReport}
              isActive={activeStage === 3}
              addLog={addLog}
            />
          </div>

          {/* Arrow */}
          <div className="flex items-center pt-24 flex-shrink-0">
            <ArrowRight
              className={`w-8 h-8 transition-colors ${
                activeStage >= 4 ? 'text-[#C8B896]' : 'text-[#E6DFD0]'
              }`}
            />
          </div>

          {/* Stage 4: Logs */}
          <div className="flex-shrink-0 w-96">
            <LogStage logs={workflow.logs} isActive={activeStage === 4} />
          </div>
        </div>
      </div>
    </div>
  );
}
