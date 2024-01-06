export default function transformOptions(data: any[]) {
  return data.map((d) => ({ label: d, value: d }));
}
