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

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");

  return data;
};

export const resetPassword = async (token, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");

  return data;
};
