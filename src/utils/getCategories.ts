import * as XLSX from 'xlsx';

interface CategoryData {
  [category: string]: {
    [subCategory: string]: string[];
  };
}

function readCategoriesFromExcel(filePath: string): CategoryData {
  // 엑셀 파일 불러오기
  let workbook;
  try {
    workbook = XLSX.readFile(filePath);
  } catch (error) {
    console.error('파일을 불러오는 데 실패했습니다:', error);
    return {};
  }
  const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 사용
  const worksheet = workbook.Sheets[sheetName];
  const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // 데이터를 2차원 배열로 변환

  // 카테고리 데이터 구조화
  const categoryData: CategoryData = {};
  data.forEach((row: any[], index: number) => {
    if (index === 0) {
      // 첫 번째 행은 카테고리 제목들
      row.forEach((cell: any, colIndex: number) => {
        if (cell && typeof cell === 'string') {
          categoryData[cell] = {};
        }
      });
    } else {
      // 카테고리 별로 하위 항목 추가
      row.forEach((cell: any, colIndex: number) => {
        const categoryName = data[0][colIndex];
        if (categoryName && cell) {
          if (!categoryData[categoryName][cell]) {
            categoryData[categoryName][cell] = [];
          }
        }
      });
    }
  });

  // // 3차 카테고리 데이터 추가
  // data.forEach((row: any[]) => {
  //   row.forEach((cell: any, colIndex: number) => {
  //     const categoryName = data[0][colIndex];
  //     if (categoryName && cell && categoryData[categoryName][cell]) {
  //       if (colIndex + 1 < row.length && row[colIndex + 1]) {
  //         categoryData[categoryName][cell].push(row[colIndex + 1]);
  //       }
  //     }
  //   });
  // });
  console.log(categoryData)
  return categoryData;
}

// 파일 경로는 실제 사용 시 수정 필요
const categories = readCategoriesFromExcel('./public/categories.xlsx');
console.log(categories);

export default categories;
