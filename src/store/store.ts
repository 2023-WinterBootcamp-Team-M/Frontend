import {create} from "zustand";

interface UserIdState {
    userId: number | null;
    setUserId: (newState: number) => Promise<void>;
  }

export const userIdStore = create<UserIdState>((set)=>({
    userId: null,
    setUserId: async (newState) => {
    await set({ userId : newState})
  },
}));


