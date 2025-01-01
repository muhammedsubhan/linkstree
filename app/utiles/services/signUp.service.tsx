import axios from "axios";

export interface SignUpCredentials {
  email: string;
  username: string;
  password: string;
}

export const SignUpUser = async (credentials: SignUpCredentials) => {
  const { email, password, username } = credentials;

  try {
    const newUser = await axios.post("http://localhost:5000/users/", {
      email,
      password,
      username,
    });
    console.log("User signed up successfully:", newUser.data);
    return newUser.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occurred!");
    }
  }
};
