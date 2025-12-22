import { updateUserProfileDto } from "@/types/dto/updateUserProfileDto";
import { User } from "@/types/User";

export async function getCurrentUserProfile(
  token: string
): Promise<User> {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/user/`,
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

  const user: User = await res.json();

  return user;
}

export async function updateUserProfile(
  token: string,
  updateUserProfileDto: updateUserProfileDto
): Promise<User> {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/user/`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserProfileDto)
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  const user: User = await res.json();

  return user;
}
