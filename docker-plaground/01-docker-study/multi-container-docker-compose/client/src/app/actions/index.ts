/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

interface CreateUserResponse {
  message: string;
}

export async function createUser(prevState: any, formData: FormData): Promise<CreateUserResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as File | null;

  if (!email || !password) {
    return { message: "Email and password are required" };
  }

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify({ email, password }));

  if (image) {
    newFormData.append("image", image);
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/create-user`, {
      method: "POST",
      body: newFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || "An error occurred" };
    }

    const data = await response.json();
    revalidateTag("users");
    return { message: data.message };
  } catch (error) {
    return { message: error instanceof Error ? error.message : "Unknown error occurred" };
  }
}
