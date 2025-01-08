// signupStore.ts
// 회원가입과 관련된 Store
import { create } from 'zustand';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 정규 표현식
const passwordRegEx = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

const validEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

const validName = (name: string): boolean => {
  return name.trim().length > 0; // 이름이 비어있지 않은지 확인
};

const validPassword = (password: string): boolean => {
  return passwordRegEx.test(password);
};
const validPassword2 = (password: string, password2: string): boolean => {
  return password === password2;
};

interface Store {
  // 이메일
  email: string;
  setEmail: (value: string) => void;
  isEmailValid: boolean;
  setIsEmailValid: (value: boolean) => void;
  isEmailCheck: boolean;
  setIsEmailCheck: (value: boolean) => void;

  // 닉네임
  name: string;
  setName: (value: string) => void;
  isNameValid: boolean;
  setIsNameValid: (value: boolean) => void;
  isNameCheck: boolean;
  setIsNameCheck: (value: boolean) => void;

  // 비밀번호
  password: string;
  setPassword: (value: string) => void;
  isPasswordValid: boolean;
  setIsPasswordValid: (value: boolean) => void;

  // 비밀번호 확인
  password2: string;
  setPassword2: (value: string) => void;
  isPassword2Valid: boolean;
  setIsPassword2Valid: (value: boolean) => void;
}
const signupStore = create<Store>((set, get) => ({
  // 1. 이메일
  email: '',
  setEmail: (value: string) => {
    set({ email: value });
    set({ isEmailValid: validEmail(value) }); // 이메일 유효성 검사
  },
  isEmailValid: false,
  setIsEmailValid: (value: boolean) => set({ isEmailValid: value }),
  isEmailCheck: false,
  setIsEmailCheck: (value: boolean) => set({ isEmailCheck: value }),

  // 2. 닉네임
  name: '',
  setName: (value: string) => {
    set({ name: value });
    set({ isNameValid: validName(value) }); // 닉네임 유효성 검사
    set({ isNameCheck: false });
  },
  isNameValid: false,
  setIsNameValid: (value: boolean) => set({ isNameValid: value }),
  isNameCheck: false,
  setIsNameCheck: (value: boolean) => set({ isNameCheck: value }),

  password: '',
  setPassword: (value: string) => {
    set({ password: value });
    set({ isPasswordValid: validPassword(value) }); // 비밀번호 유효성 검사
  },
  isPasswordValid: false,
  setIsPasswordValid: (value: boolean) => set({ isPasswordValid: value }),

  password2: '',
  setPassword2: (value) => {
    set({ password2: value });
    set({ isPassword2Valid: validPassword2(get().password, value) });
  },
  isPassword2Valid: false,
  setIsPassword2Valid: (value) => set({ isPassword2Valid: value }),
}));

export default signupStore;
