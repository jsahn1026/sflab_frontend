import { format } from 'date-fns';
import { DefaultValue, atom, selector } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

export type SettingType = {
  brands: string[];
  genders: string[];
  items: string[];
  period: {
    startDate: string;
    endDate: string;
  };
  SKU: boolean;
  newitems: boolean;
  drilldown: string;
};

export const settingState = atom<SettingType>({
  key: 'settingState',
  default: {
    brands: [],
    genders: [],
    items: [],
    period: {
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
    },
    SKU: false, // Default value for SKU
    newitems: false, // Default value for newitems
    drilldown: "small_category"
  },
  effects: [localStorageEffect('setting')],
});

export const brandsState = selector<SettingType['brands']>({
  key: 'brandState',
  get: ({ get }) => get(settingState).brands,
  set: ({ set, get }, brands) => {
    const setting = get(settingState);
    if (!(brands instanceof DefaultValue)) {
      set(settingState, { ...setting, brands });
    }
  },
});

export const genderState = selector<SettingType['genders']>({
  key: 'genderState',
  get: ({ get }) => get(settingState).genders,
  set: ({ set, get }, genders) => {
    const setting = get(settingState);
    if (!(genders instanceof DefaultValue)) {
      set(settingState, { ...setting, genders });
    }
  },
});

export const itemState = selector<SettingType['items']>({
  key: 'itemState',
  get: ({ get }) => get(settingState).items,
  set: ({ set, get }, items) => {
    const setting = get(settingState);
    if (!(items instanceof DefaultValue)) {
      set(settingState, { ...setting, items });
    }
  },
});

export const periodState = selector<SettingType['period']>({
  key: 'periodState',
  get: ({ get }) => get(settingState).period,
  set: ({ set, get }, period) => {
    const setting = get(settingState);
    if (!(period instanceof DefaultValue)) {
      set(settingState, { ...setting, period });
    }
  },
});

export const SKUState = selector<SettingType['SKU']>({
  key: 'SKUState',
  get: ({ get }) => get(settingState).SKU,
  set: ({ set, get }, SKU) => {
    const setting = get(settingState);
    if (!(SKU instanceof DefaultValue)) {
      set(settingState, { ...setting, SKU });
    }
  },
});

export const newItemState = selector<SettingType['newitems']>({
  key: 'newItemState',
  get: ({ get }) => get(settingState).newitems,
  set: ({ set, get }, newitems) => {
    const setting = get(settingState);
    if (!(newitems instanceof DefaultValue)) {
      set(settingState, { ...setting, newitems });
    }
  },
});

export const drillDownState = selector<SettingType['drilldown']>({
  key: 'drillDownState',
  get: ({ get }) => get(settingState).drilldown,
  set: ({ set, get }, drilldown) => {
    const setting = get(settingState);
    if (!(drilldown instanceof DefaultValue)) {
      set(settingState, { ...setting, drilldown });
    }
  },
});