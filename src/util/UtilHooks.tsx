export const shortenAddress = () => {};

export const getExplorerLink = () => {};

export function useGetRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function formatNumberWithMaxDecimals(value: any, maxDecimals?: number) {
  const formattedNumber = Number(value).toFixed(maxDecimals ?? 2);
  return formattedNumber.replace(/\.?0+$/, ''); // Removes trailing zeros
}
