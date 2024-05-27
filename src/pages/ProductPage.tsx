import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Filter from 'components/Filter/Filter';
import { format } from 'date-fns';
import { useBrandQuery } from 'hooks/useBrandQuery';
import useItemParams from 'hooks/useItemParams';
import useLabelNameParams from 'hooks/useLabelNameParams';
import { useProductQuery } from 'hooks/useProductQuery';
import useSplitNameParams from 'hooks/useSplitNameParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRangeProps } from 'react-date-range';
import { useRecoilValue } from 'recoil';
import { SettingType, genderState, periodState } from 'store/setting';
import { splitState } from 'store/split';

const ProductPage = () => {
  const item = useItemParams();
  const splitName = useSplitNameParams();
  const labelName = useLabelNameParams();

  const [index, setIndex] = useState(0);
  // const [options, setOptions] = useState(['test']);
  const [show, setShow] = useState(10);

  const brandList = useBrandQuery();
  const [brand, setBrand] = useState('');
  const splits = useRecoilValue(splitState);
  const localPeriod = useRecoilValue(periodState);
  const localGenders = useRecoilValue(genderState);

  const [period, setPeriod] = useState<SettingType['period']>(localPeriod);
  const [genders, setGenders] = useState<string[]>(localGenders);
  const [items, setItems] = useState<string[]>(splitName ? [] : [item]);

  useEffect(() => {
    setBrand(brandList[0]);
  }, [brandList]);
  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
  };

  const keywords = useMemo(() => {
    if (labelName) {
      const label = splits
        .find((split) => split.splitName == splitName)
        ?.label.find((label) => label.labelName == labelName);

      if (label) {
        const { includeKeywords, excludeKeywords } = label;
        return { includeKeywords, excludeKeywords };
      }
    }

    if (splitName) {
      const includeKeywords = splits
        .map((split) =>
          split.label.map(({ includeKeywords }) => includeKeywords)
        )
        .flat()
        .flat();

      const excludeKeywords = splits
        .map((split) =>
          split.label.map(({ excludeKeywords }) => excludeKeywords)
        )
        .flat()
        .flat();

      return {
        includeKeywords,
        excludeKeywords,
      };
    }

    return {
      includeKeywords: [],
      excludeKeywords: [],
    };
  }, [splits, splitName, labelName, items]);

  const productData = useProductQuery({
    brand,
    keywords: keywords.includeKeywords.concat(items),
    index,
    show,
    dates: [localPeriod.startDate, localPeriod.endDate],
    genders,
  });

  useEffect(() => {
    setIndex(0);
  }, [show]);

  const handleChangePage = useCallback((event, page) => {
    setIndex(page);
  }, []);

  const handleOnRangeChange = useCallback(
    (ranges: DateRangeProps) => {
      setPeriod({
        startDate: format(ranges['selection'].startDate, 'yyyy-MM-dd'),
        endDate: format(ranges['selection'].endDate, 'yyyy-MM-dd'),
      });
    },
    [setPeriod]
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

  const handleChangeItemCount = useCallback((e: SelectChangeEvent<number>) => {
    setShow(Number(e.target.value));
  }, []);

  // const names = [
  //   'Oliver Hansen',
  //   'Van Henry',
  //   'April Tucker',
  //   'Ralph Hubbard',
  //   'Omar Alexander',
  //   'Carlos Abbott',
  //   'Miriam Wagner',
  //   'Bradley Wilkerson',
  //   'Virginia Andrews',
  //   'Kelly Snyder',
  // ];

  // const handleChangeOptions = useCallback((e: SelectChangeEvent<string[]>) => {
  //   setOptions(e.target.value as string[]);
  // }, []);

  return (
    <Stack direction={'column'} spacing={5}>
      <Stack spacing={2}>
        <Typography fontSize={15} fontWeight={'bold'}>
          Select Brand
        </Typography>
        <FormControl>
          <InputLabel id="brand">Brand</InputLabel>
          <Select
            labelId="brand"
            value={brand}
            label="Brand"
            onChange={handleChange}
          >
            {brandList.map((brand) => (
              <MenuItem value={brand}>{brand}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Filter
        period={period}
        handleOnRangeChange={handleOnRangeChange}
        genders={genders}
        handleChangeGender={handleChangeGender}
        items={items}
        handleChangeItems={handleChangeItems}
      />

      <Stack spacing={2} direction={'row'}>
        <Pagination
          count={productData?.['#pages']}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
        <FormControl>
          <InputLabel id="itemCount">표시 개수</InputLabel>
          <Select
            labelId="itemCount"
            value={show}
            label="표시 개수"
            onChange={handleChangeItemCount}
          >
            <MenuItem value={10}>10개</MenuItem>
            <MenuItem value={20}>20개</MenuItem>
            <MenuItem value={40}>40개</MenuItem>
            <MenuItem value={60}>60개</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl>
            <InputLabel id="options">보기 옵션 선택</InputLabel>
            <Select
              labelId="options"
              label="보기 옵션 선택"
              multiple
              value={options}
              onChange={handleChangeOptions}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={options.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Stack>
        <Grid container spacing={2}>
          {productData?.items.map((product) => {
            return (
              <Grid
                item
                xs={3}
                md={3}
                lg={3}
                justifyContent={'center'}
                data-crawlingTargetId={product.crawlingTargetId}
              >
                <Card sx={{ maxWidth: 500 }}>
                  <CardHeader
                    title={product.상품명}
                    subheader={product.item_no}
                    // subheader={`${product.item_no} ${product.main_category} / ${
                    //   product['small_category '] ?? ''
                    // }`}
                  />
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                  />
                  <CardContent>
                    <Stack spacing={2}>
                      {product.상위범주 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>메인 카테고리</Typography>
                          <Chip label={product.상위범주} />
                        </Stack>
                      )}
                      {product.하위범주 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>서브 카테고리</Typography>
                          <Chip label={product.하위범주} />
                        </Stack>
                      )}
                      {product.판매가 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>판매가</Typography>
                          <Chip label={`${Number(product.판매가).toLocaleString()}원`} />
                        </Stack>
                      )}
                      {product.상품상세정보 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>상세 정보</Typography>
                          <Typography style={{ fontSize: '9px' }}>{product.상품상세정보}</Typography>
                        </Stack>
                      )}
                      {product.소재 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>소재</Typography>
                          <Typography>{product.소재}</Typography>
                        </Stack>
                      )}
                      {product.색상 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>색상</Typography>
                          <Typography>{product.색상}</Typography>
                        </Stack>
                      )}
                      {product.사이즈 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>사이즈</Typography>
                          <Typography>{product.사이즈}</Typography>
                        </Stack>
                      )}
                      {product.제조국 && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>제조국</Typography>
                          <Typography style={{ fontSize: '9px' }}>{product.제조국}</Typography>
                        </Stack>
                      )}
                      {product.main_category && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>main</Typography>
                          <Typography>{product.main_category}</Typography>
                        </Stack>
                      )}
                      {product.mid_category && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>mid</Typography>
                          <Typography>{product.mid_category}</Typography>
                        </Stack>
                      )}
                      {product.small_category && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>small</Typography>
                          <Typography>{product.small_category}</Typography>
                        </Stack>
                      )}
                      {product.collar && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>collar</Typography>
                          <Typography>{product.collar}</Typography>
                        </Stack>
                      )}
                      {product.shape && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>shape</Typography>
                          <Typography>{product.shape}</Typography>
                        </Stack>
                      )}
                      {product.length && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>length</Typography>
                          <Typography>{product.length}</Typography>
                        </Stack>
                      )}
                      {product.sleeve_length && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>sleeve length</Typography>
                          <Typography>{product.sleeve_length}</Typography>
                        </Stack>
                      )}
                      {product.texture && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>texture</Typography>
                          <Typography>{product.texture}</Typography>
                        </Stack>
                      )}
                      {product.color && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>color</Typography>
                          <Typography>{product.color}</Typography>
                        </Stack>
                      )}
                      {product.print && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>print</Typography>
                          <Typography>{product.print}</Typography>
                        </Stack>
                      )}
                      {product.fiber && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>fiber</Typography>
                          <Typography>{product.fiber}</Typography>
                        </Stack>
                      )}
                      {product.fabric && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>fabric</Typography>
                          <Typography>{product.fabric}</Typography>
                        </Stack>
                      )}
                      {product.woven && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>woven</Typography>
                          <Typography >{product.woven}</Typography>
                        </Stack>
                      )}
                      {product.neckline && (
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Typography>neckline</Typography>
                          <Typography>{product.neckline}</Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default ProductPage;
