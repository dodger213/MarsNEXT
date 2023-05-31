export const shortenAddress = () => {};

export const getExplorerLink = () => {};

export function useGetRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
