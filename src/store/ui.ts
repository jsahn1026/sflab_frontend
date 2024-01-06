import { atom } from 'recoil';

export const sidebarCollapsedState = atom<boolean>({
  key: 'sidebarCollapsedState',
  default: false,
});

export const sidebarToggleState = atom<boolean>({
  key: 'sidebarToggleState',
  default: false,
});
