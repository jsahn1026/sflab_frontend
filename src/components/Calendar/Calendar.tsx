import React, { useMemo, useState } from 'react';
import { parse } from 'date-fns';
import { DateRange, DateRangeProps } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Calendar.css'; // Import the CSS file
import { SettingType } from 'store/setting';

interface CalendarProps {
  period: SettingType['period'];
  handleOnRangeChange: (ranges: DateRangeProps) => void;
}

const Calendar = (props: CalendarProps) => {
  const [isOpen, setIsOpen] = useState(false); // State to control calendar visibility

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="custom-calendar">
      <button onClick={toggleCalendar}>
        {isOpen ? 'Hide Calendar' : 'Show Calendar'}
      </button>
      {isOpen && (
        <DateRange
          editableDateInputs={true}
          onChange={props.handleOnRangeChange}
          ranges={ranges}
        />
      )}
    </div>
  );
};

export default Calendar;
