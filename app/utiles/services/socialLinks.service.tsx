import { SocialLink } from "@/app/lib/store/features/sociallinks/SocialLinksSlice";
import axios from "axios";
import Cookies from "js-cookie";

export const createSocialLinks = async (link: SocialLink) => {
  const token = Cookies.get("accessToken");

  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return;
  }

  try {
    const createlinks = await axios.post(
      "http://localhost:5000/social-links",
      link,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Social link created:", createlinks.data);
  } catch (error) {
    console.error("Error creating social link:");
  }
};

export const getAllSocialLinks = async () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return [];
  }

  try {
    const response = await axios.get("http://localhost:5000/social-links", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching social links:");
    return [];
  }
};

export const updateSocialLinksData = async (link: SocialLink) => {
  const token = Cookies.get("accessToken");

  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return;
  }

  try {
    const createlinks = await axios.put(
      `http://localhost:5000/social-links/${link._id}`,
      link,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Social link created:", createlinks.data);
  } catch (error) {
    console.error("Error creating social link:");
  }
};

export const deleteSocialLinksData = async (id: string) => {
  const token = Cookies.get("accessToken");

  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return;
  }

  try {
    const createlinks = await axios.delete(
      `http://localhost:5000/social-links/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Social link created:", createlinks.data);
  } catch (error) {
    console.error("Error creating social link:");
  }
};

export const fetchAllSocialLinks = async () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    console.error("User is not logged in. Token is missing.");
    return [];
  }

  try {
    const response = await axios.get("http://localhost:5000/social-links", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching social links:", error);
    return [];
  }
};
