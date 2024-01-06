import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { splitState } from 'store/split';

interface CategoryTableProps {
  rows: {
    labelName: string;
    includeKeywords: string[];
    excludeKeywords: string[];
  }[];
  splitIndex: number;
}

const CategoryTable = (props: CategoryTableProps) => {
  const [splits, setSplits] = useRecoilState(splitState);

  const handleRemoveLabels = useCallback(
    (labelName: string) => {
      const newSplits = splits.slice();
      newSplits[props.splitIndex] = {
        splitName: newSplits[props.splitIndex].splitName,
        label: newSplits[props.splitIndex].label.filter(
          (label, i) => label.labelName !== labelName
        ),
      };
      setSplits(newSplits);
    },
    [props.splitIndex, setSplits, splits]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'No', width: 30 },
      { field: 'labelName', headerName: 'Label Name', width: 150 },
      { field: 'includeKeywords', headerName: 'Include Keywords', width: 300 },
      { field: 'excludeKeywords', headerName: 'Exclude Keywords', width: 300 },
      {
        field: 'button',
        headerName: '',
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveLabels(params.row.labelName);
            }}
          >
            remove
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Box height={400} width={1000}>
      <DataGrid
        rows={props.rows.map((row, index) => ({
          id: index + 1,
          labelName: row.labelName,
          includeKeywords: row.includeKeywords,
          excludeKeywords: row.excludeKeywords,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};

export default CategoryTable;
