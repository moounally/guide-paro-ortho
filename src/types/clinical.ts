import { z } from "zod";

export const riskScoreSchema = z.object({
  biotype: z.enum(['0', '1', '2']),
  bop: z.enum(['0', '1', '2']),
  ppd: z.enum(['0', '1', '2']),
  antecedents: z.enum(['0', '1', '2']),
  pi: z.enum(['0', '1', '2']),
  systemic: z.enum(['0', '1', '2']),
  compliance: z.enum(['0', '1', '2']),
});

export type RiskScoreData = z.infer<typeof riskScoreSchema>;

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface DecisionBranch {
  level: RiskLevel;
  recommendation: string;
  prescription: string;
}
