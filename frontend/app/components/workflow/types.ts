// ---------------------------------------------------------------------------
// The `nodeType` field is the dispatch key used by the backend workflow engine
// (workflow_engine.py). It MUST match one of:
//   TRIGGER_TYPES, ACTION_TYPES, CONDITION_TYPES, or OUTPUT_TYPES
// React Flow uses the top-level `type` field for rendering (trigger | action |
// conditional | endpoint), while `data.nodeType` tells the engine what to do.
// ---------------------------------------------------------------------------

export interface CatalogueNode {
  nodeType: string;             // backend dispatch key (e.g. "alert_engineer")
  label: string;                // UI display name
  description: string;
  params: Record<string, string>;
}

export interface NodeCatalogueCategory {
  category: string;
  /** React Flow custom node component type */
  reactFlowType: 'trigger' | 'action' | 'conditional' | 'endpoint';
  nodes: CatalogueNode[];
}

export interface WorkflowNodeData {
  label: string;
  nodeType: string;             // backend dispatch key
  description: string;
  params: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Node catalogue — every entry corresponds to a type recognised by the
// backend's workflow_engine.py dispatch table.
// ---------------------------------------------------------------------------

export const NODE_CATALOGUE: NodeCatalogueCategory[] = [
  {
    category: 'Triggers',
    reactFlowType: 'trigger',
    nodes: [
      {
        nodeType: 'anomaly_detected',
        label: 'Anomaly Detected',
        description: 'Triggered when sensor detects abnormal behavior',
        params: {},
      },
      {
        nodeType: 'vibration_threshold_exceeded',
        label: 'Vibration Alert',
        description: 'Triggered when vibration exceeds safe threshold',
        params: {},
      },
      {
        nodeType: 'temperature_alert',
        label: 'Temperature Alert',
        description: 'Triggered when temperature is out of range',
        params: {},
      },
      {
        nodeType: 'maintenance_due',
        label: 'Maintenance Due',
        description: 'Triggered when scheduled maintenance is approaching',
        params: {},
      },
      {
        nodeType: 'machine_offline',
        label: 'Machine Offline',
        description: 'Triggered when machine stops responding',
        params: {},
      },
      {
        nodeType: 'power_consumption_spike',
        label: 'Power Spike',
        description: 'Triggered when power consumption spikes abnormally',
        params: {},
      },
    ],
  },
  {
    category: 'Actions',
    reactFlowType: 'action',
    nodes: [
      {
        nodeType: 'alert_engineer',
        label: 'Alert Engineer',
        description: 'Send urgent notification to maintenance engineer',
        params: { message: '', priority: 'high' },
      },
      {
        nodeType: 'send_sms',
        label: 'Send SMS',
        description: 'Send SMS alert to engineer or supervisor',
        params: { message: '', recipient: '' },
      },
      {
        nodeType: 'schedule_maintenance',
        label: 'Schedule Maintenance',
        description: 'Create a maintenance task in the system',
        params: { priority: 'normal', estimated_duration: '' },
      },
      {
        nodeType: 'send_notification',
        label: 'Send Notification',
        description: 'Send notification to operations team',
        params: { message: '', recipient: 'operations', priority: 'normal' },
      },
      {
        nodeType: 'create_work_order',
        label: 'Create Work Order',
        description: 'Generate a work order for maintenance',
        params: { type: '', priority: 'routine', notes: '' },
      },
      {
        nodeType: 'shutdown_machine',
        label: 'Shutdown Machine',
        description: 'Safely shutdown the machine to prevent damage',
        params: { reason: '', emergency: 'false' },
      },
      {
        nodeType: 'update_machine_status',
        label: 'Update Machine Status',
        description: 'Update machine status in the system',
        params: { status: '', notes: '' },
      },
      {
        nodeType: 'assign_to_technician',
        label: 'Assign to Technician',
        description: 'Assign issue to a specific technician',
        params: { technician_id: '', task_type: 'inspection', due_date: '' },
      },
    ],
  },
  {
    category: 'Conditionals',
    reactFlowType: 'conditional',
    nodes: [
      {
        nodeType: 'check_risk_level',
        label: 'Check Risk Level',
        description: 'Branch based on calculated risk severity',
        params: { operator: 'greater_than', threshold: 'medium' },
      },
      {
        nodeType: 'check_machine_status',
        label: 'Check Machine Status',
        description: 'Branch based on current machine operational status',
        params: { status: 'running' },
      },
      {
        nodeType: 'check_operating_hours',
        label: 'Check Operating Hours',
        description: 'Branch based on machine operating hours',
        params: { operator: 'greater_than', threshold: '', threshold_max: '' },
      },
      {
        nodeType: 'check_last_maintenance',
        label: 'Check Last Maintenance',
        description: 'Branch based on time since last maintenance',
        params: { days_since_last: '90' },
      },
      {
        nodeType: 'check_spare_parts',
        label: 'Check Spare Parts',
        description: 'Branch based on spare parts availability',
        params: { part_id: '' },
      },
    ],
  },
  {
    category: 'Output',
    reactFlowType: 'endpoint',
    nodes: [
      {
        nodeType: 'log_completion',
        label: 'Log Completion',
        description: 'Log that the workflow completed successfully',
        params: {},
      },
      {
        nodeType: 'generate_report',
        label: 'Generate Report',
        description: 'Generate maintenance report for review',
        params: {},
      },
      {
        nodeType: 'create_analytics_entry',
        label: 'Create Analytics Entry',
        description: 'Add entry to analytics database',
        params: {},
      },
      {
        nodeType: 'send_summary_to_supervisor',
        label: 'Send Summary to Supervisor',
        description: 'Send execution summary to operations supervisor',
        params: {},
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Visual styles per category — used by node components, palette, and panel
// ---------------------------------------------------------------------------

export const CATEGORY_STYLES = {
  Triggers: {
    nodeBg: 'bg-blue-950/70',
    nodeBorder: 'border-blue-700/60',
    nodeSelectedBorder: 'border-blue-400',
    nodeSelectedShadow: 'shadow-blue-500/25',
    handleBg: '!bg-blue-500',
    handleBorder: '!border-blue-300',
    accent: 'text-blue-600',
    badge: 'text-blue-600 bg-blue-50 border-blue-200',
    palette: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    dot: 'bg-blue-500',
    icon: '⚡',
    label: 'Trigger',
  },
  Actions: {
    nodeBg: 'bg-purple-950/70',
    nodeBorder: 'border-purple-700/60',
    nodeSelectedBorder: 'border-purple-400',
    nodeSelectedShadow: 'shadow-purple-500/25',
    handleBg: '!bg-purple-500',
    handleBorder: '!border-purple-300',
    accent: 'text-purple-600',
    badge: 'text-purple-600 bg-purple-50 border-purple-200',
    palette: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    dot: 'bg-purple-500',
    icon: '⚙',
    label: 'Action',
  },
  Conditionals: {
    nodeBg: 'bg-amber-950/70',
    nodeBorder: 'border-amber-700/60',
    nodeSelectedBorder: 'border-amber-400',
    nodeSelectedShadow: 'shadow-amber-500/25',
    handleBg: '!bg-amber-500',
    handleBorder: '!border-amber-300',
    accent: 'text-amber-600',
    badge: 'text-amber-600 bg-amber-50 border-amber-200',
    palette: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
    dot: 'bg-amber-500',
    icon: '◇',
    label: 'Condition',
  },
  Output: {
    nodeBg: 'bg-gray-800/70',
    nodeBorder: 'border-gray-600/60',
    nodeSelectedBorder: 'border-gray-400',
    nodeSelectedShadow: 'shadow-gray-500/25',
    handleBg: '!bg-gray-500',
    handleBorder: '!border-gray-300',
    accent: 'text-gray-500',
    badge: 'text-gray-600 bg-gray-50 border-gray-200',
    palette: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
    dot: 'bg-gray-500',
    icon: '■',
    label: 'Output',
  },
} as const;
