import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

export type SplitType = {
  splitName: string;
  label: {
    labelName: string;
    includeKeywords: string[];
    excludeKeywords: string[];
  }[];
};

export const splitState = atom<SplitType[]>({
  key: 'categoryState',
  default: [],
  effects: [localStorageEffect('splits')],
});
