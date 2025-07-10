// types/logs.ts
export interface Log {
    id: string;
    timestamp: Date;
    type: 'error' | 'warning' | 'info';
    message: string;
    room: string | null;
    details?: string;
  }
  
  export interface LogSummaryData {
    totalLogs: number;
    errorCount: number;
    warningCount: number;
    infoCount: number;
    togglesCount: number;
    smsCount: number;
  }
  
  export type FilterType = 'All' | 'error' | 'warning' | 'info';
  export type DateFilterType = 'All' | 'Today' | 'Yesterday' | 'Last 7 Days';