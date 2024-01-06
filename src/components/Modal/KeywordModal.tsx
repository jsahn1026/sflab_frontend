import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';
import { useKeywordQuery } from 'hooks/useKeywordQuery';
import { useCallback, useEffect, useMemo, useState } from 'react';
import makeAnimated from 'react-select/animated';

import Select, { MultiValue } from 'react-select';
import { useRecoilState } from 'recoil';
import { splitState } from 'store/split';
import transformOptions from 'utils/transformOptions';

const animatedComponents = makeAnimated();

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface KeywordModalProps {
  open: boolean;
  splitIndex: number;
  close: () => void;
}

const KeywordModal = (props: KeywordModalProps) => {
  const keywords = useKeywordQuery();

  const [labelName, setLabelName] = useState('');
  const [includeKeywords, setIncludeKeywords] = useState<string[]>([]);
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([]);

  const [splits, setSplits] = useRecoilState(splitState);

  useEffect(() => {
    if (!props.open) {
      setLabelName('');
      setIncludeKeywords([]);
      setExcludeKeywords([]);
    }
  }, [props.open]);

  const keywordOptions = useMemo(
    () =>
      transformOptions(
        keywords.filter(
          (keyword) =>
            !includeKeywords.includes(keyword) &&
            !excludeKeywords.includes(keyword)
        )
      ),
    [keywords, includeKeywords, excludeKeywords]
  );

  const includeKeywordValues = useMemo(
    () => transformOptions(includeKeywords),
    [includeKeywords]
  );

  const excludeKeywordValues = useMemo(
    () => transformOptions(excludeKeywords),
    [excludeKeywords]
  );

  const handleOnChangeIncludeKeywords = useCallback(
    (options: MultiValue<{ label: string; value: string }>) => {
      setIncludeKeywords(options.map(({ value }) => value));
    },
    []
  );

  const handleOnChangeExcludeKeywords = useCallback(
    (options: MultiValue<{ label: string; value: string }>) => {
      setExcludeKeywords(options.map(({ value }) => value));
    },
    []
  );

  const handleSave = useCallback(() => {
    const newSplits = splits.slice();

    newSplits[props.splitIndex] = {
      splitName: newSplits[props.splitIndex].splitName,
      label: newSplits[props.splitIndex].label.concat({
        labelName,
        includeKeywords,
        excludeKeywords,
      }),
    };

    setSplits(newSplits);
    props.close();
  }, [
    splits,
    setSplits,
    includeKeywords,
    excludeKeywords,
    labelName,
    props.splitIndex,
  ]);

  if (!props.open) return null;

  return (
    <Modal open={props.open} onClose={props.close}>
      <Stack sx={style} justifyContent={'space-between'}>
        <Stack gap={3}>
          <Typography fontSize={20} fontWeight={'bold'}>
            ADD KEYWORD
          </Typography>

          <TextField
            label="Label Name"
            onChange={(e) => setLabelName(e.target.value)}
          />

          <Stack gap={1}>
            <Typography fontWeight={'bold'}>Include Keywords</Typography>
            <Select
              options={keywordOptions}
              components={animatedComponents}
              value={includeKeywordValues}
              onChange={handleOnChangeIncludeKeywords}
              isMulti
            />
          </Stack>
          <Stack gap={1}>
            <Typography fontWeight={'bold'}>Exclude Keywords</Typography>
            <Select
              options={keywordOptions}
              components={animatedComponents}
              value={excludeKeywordValues}
              onChange={handleOnChangeExcludeKeywords}
              isMulti
            />
          </Stack>
        </Stack>
        <Stack direction={'row'}>
          <Button variant="contained" fullWidth onClick={handleSave}>
            SAVE
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default KeywordModal;
