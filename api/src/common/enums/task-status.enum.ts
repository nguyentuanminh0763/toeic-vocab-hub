export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  PAUSED: 'PAUSED',
  DONE: 'DONE',
  CANCELED: 'CANCELED',
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export const TASK_STATUSES = Object.values(TASK_STATUS);
