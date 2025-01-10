import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Avatar {
  key: string;
  message: string;
}

interface AvatarState {
  Avatar: Avatar;
  loading: boolean;
  error: string | null;
}

const initialState: AvatarState = {
  Avatar: {
    key: "",
    message: "",
  },
  loading: false,
  error: null,
};

export const AvatarSlice = createSlice({
  name: "Avatar",
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<Avatar>) {
      state.Avatar = action.payload;
    },
  },
});

export const { setAvatar } = AvatarSlice.actions;

export default AvatarSlice.reducer;
