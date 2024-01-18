import {create} from "zustand";

interface UserIdState {
    userId: number | null;
    setUserId: (newState: number) => Promise<void>;
}

interface OptStoreState {
    opt_sum: number;
    opt_start: number;
    opt_theme: number;
    opt_alarm: number;
  }
  
interface OptStoreActions {
    toggleOptSum: () => void;
    toggleOptStart: () => void;
    toggleOptTheme: () => void;
    toggleOptAlarm: () => void;
}

//유저 아이디
export const userIdStore = create<UserIdState>((set)=>({
    userId: null,
    setUserId: async (newState) => {
    await set({ userId : newState})
  },
}));

//설정
export const optStore = create<OptStoreState & OptStoreActions> ((set)=>({
    opt_sum:0,
    opt_start:0,
    opt_theme:0,
    opt_alarm:0,
    toggleOptSum: () => set((state) => ({ opt_sum: state.opt_sum === 0 ? 1 : 0 })),
    toggleOptStart: () => set((state) => ({ opt_start: state.opt_start === 0 ? 1 : 0 })),
    toggleOptTheme: () => set((state) => ({ opt_theme: state.opt_theme === 0 ? 1 : 0 })),
    toggleOptAlarm: () => set((state) => ({ opt_alarm: state.opt_alarm === 0 ? 1 : 0 })),
}))