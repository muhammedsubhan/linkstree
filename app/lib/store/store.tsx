import { configureStore } from "@reduxjs/toolkit";
import socialLinksReducer from "../store/features/sociallinks/SocialLinksSlice";
import avatarReducer from "../store/features/avatarSlice/AvatarSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      socialLinks: socialLinksReducer,
      userAvatar: avatarReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
