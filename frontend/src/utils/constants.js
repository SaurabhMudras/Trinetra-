export const SEVERITY_LEVELS = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export const SEVERITY_COLORS = {
  critical: 'bg-red-950/50 text-red-400 border-red-800',
  high: 'bg-orange-950/50 text-orange-400 border-orange-800',
  medium: 'bg-amber-950/50 text-amber-400 border-amber-800',
  low: 'bg-blue-950/50 text-blue-400 border-blue-800',
};

export const STATUS_COLORS = {
  open: 'bg-blue-950/50 text-blue-400 border-blue-800',
  in_progress: 'bg-amber-950/50 text-amber-400 border-amber-800',
  investigating: 'bg-amber-950/50 text-amber-400 border-amber-800',
  resolved: 'bg-emerald-950/50 text-emerald-400 border-emerald-800',
  closed: 'bg-gray-800 text-gray-400 border-gray-700',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  SOC_ANALYST: 'soc_analyst',
  THREAT_RESEARCHER: 'threat_researcher',
  INCIDENT_RESPONDER: 'incident_responder',
  VIEWER: 'viewer',
};

export const INCIDENT_STATUSES = ['open', 'in_progress', 'resolved', 'closed'];
export const ALERT_STATUSES = ['open', 'investigating', 'resolved', 'closed'];
