import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface SocialLink {
  userId: string;
  platform: string;
  url: string;
  active: boolean;
  _id: string;
}
interface SocialLinksState {
  socialLinks: SocialLink[];
  loading: boolean;
  error: string | null;
}

const initialState: SocialLinksState = {
  socialLinks: [],
  loading: false,
  error: null,
};

export const SocialLinksSlice = createSlice({
  name: "socialLinks",
  initialState,
  reducers: {
    addSocialLinkStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSocialLinkSuccess: (
      state,
      action: PayloadAction<SocialLink | SocialLink[]>
    ) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.socialLinks = action.payload;
      } else {
        state.socialLinks.push(action.payload);
      }
    },
    addSocialLinkFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeSocialLink: (state, action: PayloadAction<string>) => {
      state.socialLinks = state.socialLinks.filter(
        (link) => link._id !== action.payload
      );
    },
    updateSocialLink: (state, action: PayloadAction<SocialLink>) => {
      const index = state.socialLinks.findIndex(
        (link) => link._id === action.payload._id
      );
      if (index !== -1) {
        state.socialLinks[index] = {
          ...state.socialLinks[index],
          ...action.payload,
        };
      }
    },

    toggleActiveStatus: (state, action: PayloadAction<string>) => {
      const index = state.socialLinks.findIndex(
        (link) => link._id === action.payload
      );
      if (index !== -1) {
        state.socialLinks[index].active = !state.socialLinks[index].active;
      }
    },
  },
});

export const {
  addSocialLinkStart,
  addSocialLinkSuccess,
  addSocialLinkFailure,
  removeSocialLink,
  updateSocialLink,
} = SocialLinksSlice.actions;

export default SocialLinksSlice.reducer;
