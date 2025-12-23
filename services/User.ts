import { updateUserProfileDto } from "@/types/dto/updateUserProfileDto";
import { User } from "@/types/User";
import { UserRanking } from "@/types/UserRanking";

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

export async function getUserProfile(
  token: string,
  id: string
): Promise<User> {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/user/${id}`,
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

export async function uploadProfilePicture(
  token: string,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/user/upload-pfp`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    let message = "Failed to upload profile picture";

    throw new Error(message);
  }
}

export async function getUserRanking(
  token: string
): Promise<UserRanking[]> {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/user/top`,
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

  const ranking: UserRanking[] = await res.json();

  return ranking;
}
