export const truncateText = (text: string, cutOff = 15) =>
  text.length > cutOff ? `${text.slice(0, cutOff)}...` : text;
