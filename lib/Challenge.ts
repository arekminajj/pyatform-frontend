import { Challenge } from "@/types/Challange";

export async function getChallenge(id: number, token: string): Promise<Challenge> {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/api/challenge/${id}` , {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    })

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
    }

    const data: Challenge = await res.json()

    return data
}


export async function getAllChallenges(token: string, userId: string | null = null): Promise<Challenge[]> {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/api/challenge?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
    }

    const data: Challenge[] = await res.json();
    return data;
}