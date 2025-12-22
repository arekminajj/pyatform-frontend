import { Solution } from "@/types/Solution";
import { addSolutionDto } from "@/types/dto/addSolutionDto";

export async function getSolutionById(
  id: number,
  token: string
): Promise<Solution> {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/solution/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  const solution: Solution = await res.json();

  return solution;
}

export async function addSolution(
  dto: addSolutionDto,
  token: string
): Promise<Solution> {
  const res = await fetch(`${process.env.BACKEND_BASE_URL}/api/solution`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  const solution: Solution = await res.json();
  return solution;
}

export async function getSolutions(token: string, challengeId: number | null | undefined, userId: string | null | undefined): Promise<Solution[]> {
    const query = new URLSearchParams();
    if (challengeId != null) query.append("challengeId", challengeId.toString());
    if (userId != null) query.append("userId", userId);

    const res = await fetch(`${process.env.BACKEND_BASE_URL}/api/solution?${query.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
    }

    const data: Solution[] = await res.json();
    return data;
}
