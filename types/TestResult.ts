export interface TestResult {
    id: number | null;
    returnCode: number | null;
    error: string | null;
    output: string| null;
    executionTimeMs: number | null;
    solutionId: number | null;
}
