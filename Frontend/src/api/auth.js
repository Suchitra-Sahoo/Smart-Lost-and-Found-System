import API_BASE_URL from "../config";

// Signup function
export async function signup(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signup failed");
  }

  return response.json(); 
}

// ✅ Signin function
export async function signin(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Signin failed");
  }

  return response.json(); 
}

