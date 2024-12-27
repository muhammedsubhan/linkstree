import { configureStore } from "@reduxjs/toolkit";
import socialLinksReducer from "../store/features/sociallinks/SocialLinksSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      socialLinks: socialLinksReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
