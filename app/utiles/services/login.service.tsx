import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const { email, password } = credentials;

  try {
    const newUser = await axios.post("http://localhost:5000/users/login", {
      email,
      password,
    });

    console.log("User signed up successfully:", newUser.data);
    return newUser.data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};
