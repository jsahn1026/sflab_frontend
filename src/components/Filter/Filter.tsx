import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import Calendar from 'components/Calendar/Calendar';
import TransferList from 'components/TransferList/TransferList';
import { useGenderQuery } from 'hooks/useGenderQuery';
import { useItemQuery } from 'hooks/useItemQuery';
import { useMemo } from 'react';
import { DateRangeProps } from 'react-date-range';
import { SettingType } from 'store/setting';

interface FilterProps {
  period: SettingType['period'];
  handleOnRangeChange: (ranges: DateRangeProps) => void;
  genders: string[];
  items: string[];
  handleChangeGender: (genders: string[]) => void;
  handleChangeItems: (items: string[]) => void;
}

const Filter = (props: FilterProps) => {
  const genderList = useGenderQuery();
  const itemList = useItemQuery();

  const selectableGender = useMemo(
    () => genderList.filter((gender) => !props.genders.includes(gender)),
    [genderList, props.genders]
  );

  const selectableItems = useMemo(
    () => itemList.filter((item) => !props.items.includes(item)),
    [itemList, props.items]
  );

  return (
    <Stack spacing={5} minWidth={500} alignItems={'flex-start'}>
      <Calendar
        period={props.period}
        handleOnRangeChange={props.handleOnRangeChange}
      />
      <Stack spacing={1}>
        <Typography fontSize={15} fontWeight={'bold'}>
          Select Gender
        </Typography>
        <TransferList
          left={selectableGender}
          right={props.genders}
          handleChangeRight={props.handleChangeGender}
        />
      </Stack>
      <Stack spacing={1}>
        <Typography fontSize={15} fontWeight={'bold'}>
          Select Items
        </Typography>
        <TransferList
          left={selectableItems}
          right={props.items}
          handleChangeRight={props.handleChangeItems}
        />
      </Stack>
    </Stack>
  );
};

export default Filter;
