import dayjs from 'dayjs';

export default function dateToString(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

export const dateFormatToShow = (date) => dayjs(date).format('DD/MM/YYYY');
