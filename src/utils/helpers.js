import { DATE_TIME_FORMAT } from "@/constants/common";
import moment from "moment";
moment.locale("ja");

export const convertDateTime = (value, format = DATE_TIME_FORMAT) => {
  if (!moment(value).isValid()) return;
  return moment.unix(value).format(format);
};

export const getRandomUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const truncate = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};
