export interface Challenge {
    id: number | null;
    title: string | null;
    content: string | null;
    templateCode: string | null;
    testCode: string | null;
    timeLimitMs: number | null;
    memoryLimitKb: number | null;
    userId: string | null;
}
