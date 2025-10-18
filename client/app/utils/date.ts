import { formatDistanceToNow } from "date-fns";

export const timeAgo = (date: string | number) => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    console.error("Invalid date:", date, error);
    return "";
  }
};
