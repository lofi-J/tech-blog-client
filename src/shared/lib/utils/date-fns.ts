import { format } from "date-fns";

export type DateFormatType =
  | "yyyy-MM-dd"
  | "yyyy-MM-dd HH:mm:ss"
  | "yyyy-MM-dd HH:mm"
  | "yyyy-MM-dd HH"
  | "yyyy-MM-dd HH:mm:ss.SSS";

export const formatDate = (date: string | Date, formatType: DateFormatType) => {
  return format(new Date(date), formatType);
};
