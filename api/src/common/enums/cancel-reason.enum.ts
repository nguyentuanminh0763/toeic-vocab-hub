export const CANCEL_REASON = {
  NOT_NEEDED: 'NOT_NEEDED',
  SCOPE_CHANGED: 'SCOPE_CHANGED',
  WRONG_ESTIMATE: 'WRONG_ESTIMATE',
  DUPLICATE: 'DUPLICATE',
  OTHER: 'OTHER',
} as const;

export type CancelReason = (typeof CANCEL_REASON)[keyof typeof CANCEL_REASON];

export const CANCEL_REASONS = Object.values(CANCEL_REASON);
