export default function dateToString(date) {
  const month = `${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}`;
  const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
  return `${date.getFullYear()}-${month}-${day}`;
}

export const dateFormatToShow = (date) => {
  const splitted = date.split('-');
  return `${splitted[2]}/${splitted[1]}/${splitted[0]}`;
};
