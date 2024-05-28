import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Calendar from 'components/Calendar/Calendar';
import Splits from 'components/Splits/Splits';
import TransferList from 'components/TransferList/TransferList';
import { format } from 'date-fns';
import { useBrandQuery } from 'hooks/useBrandQuery';
import { useGenderQuery } from 'hooks/useGenderQuery';
import { useItemQuery } from 'hooks/useItemQuery';
import { useCallback, useMemo } from 'react';
import { DateRangeProps } from 'react-date-range';

import { useRecoilState } from 'recoil';
import {
  SettingType,
  brandsState,
  genderState,
  periodState,
  SKUState,
  newItemState,
  itemState,
} from 'store/setting';

const Settings = () => {
  const [brands, setBrands] = useRecoilState(brandsState);
  const [genders, setGenders] = useRecoilState(genderState);
  const [items, setItems] = useRecoilState(itemState);
  const [period, setPeriod] = useRecoilState(periodState);

  const brandList = useBrandQuery();
  const genderList = useGenderQuery();
  const itemList = useItemQuery();

  const selectableBrands = useMemo(
    () => brandList.filter((brand) => !brands.includes(brand)),
    [brandList, brands]
  );

  const selectableGender = useMemo(
    () => genderList.filter((gender) => !genders.includes(gender)),
    [genderList, genders]
  );

  const selectableItems = useMemo(
    () => itemList.filter((item) => !items.includes(item)),
    [itemList, items]
  );

  const handleChangeBrand = useCallback(
    (brands: string[]) => {
      setBrands(brands);
    },
    [setBrands]
  );

  const handleChangeGender = useCallback(
    (genders: string[]) => {
      setGenders(genders);
    },
    [setGenders]
  );

  const handleChangeItems = useCallback(
    (items: string[]) => {
      setItems(items);
    },
    [setItems]
  );

  const handleOnRangeChange = useCallback(
    (ranges: DateRangeProps) => {
      setPeriod({
        startDate: format(ranges['selection'].startDate, 'yyyy-MM-dd'),
        endDate: format(ranges['selection'].endDate, 'yyyy-MM-dd'),
      });
    },
    [setPeriod]
  );

  return (
    <Stack direction={'column'} spacing={3} alignItems={'normal'}>
      <Typography fontSize={30} fontWeight={'bold'}>
        Select Brands
      </Typography>
      <TransferList
        left={selectableBrands}
        right={brands}
        handleChangeRight={handleChangeBrand}
      />
      <Typography fontSize={30} fontWeight={'bold'}>
        Select Gender
      </Typography>
      <TransferList
        left={selectableGender}
        right={genders}
        handleChangeRight={handleChangeGender}
      />
      <Typography fontSize={30} fontWeight={'bold'}>
        Select Items
      </Typography>
      <TransferList
        left={selectableItems}
        right={items}
        handleChangeRight={handleChangeItems}
      />
      <Typography fontSize={30} fontWeight={'bold'}>
        Select Date Period
      </Typography>
      <Stack direction={'column'} spacing={3} alignItems={'flex-start'}>
        <Calendar period={period} handleOnRangeChange={handleOnRangeChange} />
        <Typography>시작일 : {period.startDate}</Typography>
        <Typography>종료일 : {period.endDate}</Typography>
      </Stack>

      <Splits />
    </Stack>
  );
};

export default Settings;
