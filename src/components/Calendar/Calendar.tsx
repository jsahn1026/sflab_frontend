import { parse } from 'date-fns';
import { useMemo } from 'react';
import { DateRange, DateRangeProps } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { SettingType } from 'store/setting';

interface CalendarProps {
  period: SettingType['period'];
  handleOnRangeChange: (ranges: DateRangeProps) => void;
}

const Calendar = (props: CalendarProps) => {
  const ranges = useMemo(() => {
    return [
      {
        startDate: parse(props.period.startDate, 'yyyy-MM-dd', new Date()),
        endDate: parse(props.period.endDate, 'yyyy-MM-dd', new Date()),
        key: 'selection',
      },
    ];
  }, [props.period]);

  return (
    <DateRange
      editableDateInputs={true}
      onChange={props.handleOnRangeChange}
      ranges={ranges}
    />
  );
};

export default Calendar;
