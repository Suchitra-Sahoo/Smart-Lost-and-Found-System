import API_BASE_URL from "../config";

export async function signin(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { role, email, password }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signin failed");
  }

  return response.json(); // { message, token }
}
