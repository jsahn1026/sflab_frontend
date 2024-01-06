import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import KeywordModal from 'components/Modal/KeywordModal';

import CategoryTable from 'components/Table/CategoryTable';
import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { splitState } from 'store/split';

interface SplitsProps {}

const Splits = (props: SplitsProps) => {
  const [labelModelOpen, setLabelModalOpen] = useState(false);
  const [splits, setSplits] = useRecoilState(splitState);
  const [editSplitIndex, setEditSplitIndex] = useState(-1);

  const handleCreateCategory = useCallback(() => {
    const splitName = prompt('split name') || '';

    if (!splitName) return;

    setSplits([
      ...splits,
      {
        splitName,
        label: [],
      },
    ]);
  }, [splits, setSplits]);

  const handleRemoveSplit = useCallback((index: number) => {
    setSplits((splits) => splits.filter((_, i) => i !== index));
  }, []);

  const handleModalOpen = useCallback((index: number) => {
    setEditSplitIndex(index);
    setLabelModalOpen(true);
  }, []);

  return (
    <>
      <Typography fontSize={30} fontWeight={'bold'}>
        Splits
      </Typography>
      <Button
        style={{
          alignSelf: 'flex-start',
        }}
        variant="contained"
        onClick={handleCreateCategory}
      >
        create split
      </Button>

      {splits.map((split, index) => (
        <Stack key={index} alignItems={'flex-start'} spacing={2}>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography fontSize={20}>{split.splitName}</Typography>
            <Button variant="outlined" onClick={() => handleModalOpen(index)}>
              add keyword
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveSplit(index)}
            >
              remove split
            </Button>
          </Stack>
          <Stack direction={'row'} spacing={1}></Stack>
          <CategoryTable
            key={JSON.stringify(split)}
            rows={split.label}
            splitIndex={index}
          />
        </Stack>
      ))}
      <KeywordModal
        open={labelModelOpen}
        splitIndex={editSplitIndex}
        close={() => setLabelModalOpen(false)}
      />
    </>
  );
};

export default Splits;
