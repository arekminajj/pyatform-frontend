export interface Solution {
    id: number | null;
    userId: string | null;
    challengeId: number | null;
    content: string | null;
    executionTimeMs: number | null;
    hasPassedTests: boolean | null;
    submissionTime: Date | null;
}
