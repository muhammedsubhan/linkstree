import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred while logging in");
    }
    console.error("Error signing in user:", error);

    return null;
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
    // throw error;
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
    // throw error;
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
    toast.success("Password reset link sent to your email");
    return forgot_password.data;
  } catch (error) {
    toast.error("An error occurred while sending password reset link");
    console.error("Error fetching user social links:", error);
    // throw error;
  }
};

export const resetPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  console.log("password", password);
  console.log("token", token);
  try {
    const reset_password = await axios.post(
      `http://localhost:5000/users/reset-password`,
      {
        password,
        token,
      }
    );
    toast.success("Password reset successful");
    return reset_password.data;
  } catch (error) {
    toast.error("An error occurred while resetting password");

    console.error("Error resetting password:", error);
    // throw error;
  }
};

export const handleUploadUserAvatar = async (
  formData: FormData
): Promise<string | null> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return null;
  }

  try {
    const response = await fetch("http://localhost:5000/users/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload avatar. Status: ${response.status}`);
    }

    const responseBody = await response.json();
    console.log("Server Response:", responseBody);

    if (!responseBody) {
      throw new Error("Upload successful, but no URL returned.");
    }

    toast.success("Avatar uploaded successfully");

    return responseBody;
  } catch (error) {
    toast.error("An error occurred while uploading avatar");
    console.error("Error uploading user avatar:", error);
    return null;
  }
};

export const getAvatarByUsersId = async (userId: string): Promise<string | null> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return null;
  }

  try {
    const response = await axios.get(
      `http://localhost:5000/users/avatar/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.avatar) {
      console.log("User Avatar URL:", response.data.avatar);
      return response.data.avatar;
    } else {
      throw new Error("No avatar found for this user");
    }
  } catch (error) {
    toast.error("An error occurred while fetching avatar");
    console.error("Error fetching user avatar:", error);
    return null;
  }
};