import axios from "axios";
import Cookies from "js-cookie";
export interface LoginCredentials {
  email: string;
  username?: "";
  password: string;
}
interface UserParams {
  username: string;
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
export const getCurrentUsersLinks = async ({ username }: UserParams) => {
  const token = Cookies.get("accessToken");
  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return [];
  }

  try {
    const allUsers = await axios.get(
      `http://localhost:5000/users/username/${username}`
    );

    return allUsers.data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};
export const getUserSocialLinksById = async (_id: string) => {
  try {
    const get_SocialLinks = await axios.get(
      `http://localhost:5000/social-links/all-socials/${_id}`
    );
    return get_SocialLinks.data;
  } catch (error) {
    console.error("Error fetching user social links:", error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const forgot_password = await axios.post(
      `http://localhost:5000/users/forgot-password`,
      {
        email,
      }
    );
    return forgot_password.data;
  } catch (error) {
    console.error("Error fetching user social links:", error);
    throw error;
  }
};
