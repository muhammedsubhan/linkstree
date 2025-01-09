import axios from "axios";
import { toast } from "react-toastify";

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
    toast.success("User created successfully");

    return newUser.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred while signing up");
    }
  }
};
