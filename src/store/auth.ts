import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

export const loginState = atom<boolean>({
  key: 'login',
  default: false,
  effects: [localStorageEffect('login')],
});
