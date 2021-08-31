export const generateDateString = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}`;
};
