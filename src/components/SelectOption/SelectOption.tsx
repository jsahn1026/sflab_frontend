import Typography from '@mui/material/Typography';
import { useCallback, useMemo } from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import transformOptions from 'utils/transformOptions';

interface SelectOptionsProps {
  title: string;
  options: string[];
  placeholder: string;
  value: string[];
  setState: (state: string[]) => void;
}

const animatedComponents = makeAnimated();

const SelectOption = ({
  title,
  options,
  placeholder,
  value,
  setState,
}: SelectOptionsProps) => {
  const selectOptions = useMemo(() => transformOptions(options), [options]);
  const selectValues = useMemo(() => transformOptions(value), [value]);

  const handleOnChange = useCallback(
    (options: MultiValue<{ label: string; value: string }>) => {
      setState(options.map(({ value }) => value));
    },
    [setState]
  );

  return (
    <div>
      <Typography fontSize={15} fontWeight={'bold'}>
        {title}
      </Typography>
      <Select
        options={selectOptions}
        components={animatedComponents}
        value={selectValues}
        isMulti
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SelectOption;
