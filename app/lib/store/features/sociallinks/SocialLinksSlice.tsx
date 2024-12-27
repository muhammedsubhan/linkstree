import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface SocialLinksState {
  socialLinks: string[];
}

const initialState: SocialLinksState = {
  socialLinks: [],
};

export const SocialLinksSlice = createSlice({
  name: "socialLinks",
  initialState,
  reducers: {},
});

export const {} = SocialLinksSlice.actions;

export default SocialLinksSlice.reducer;
