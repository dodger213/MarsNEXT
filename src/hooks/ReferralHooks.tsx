export type PlanInfoType = {
  name: string;
  value: number;
  maxLimitMutiplier: number;
};
export const useReferralPlanInfo = (planId: number): PlanInfoType => {
  return { name: 'Beginner', value: 10, maxLimitMutiplier: 3 };
};
