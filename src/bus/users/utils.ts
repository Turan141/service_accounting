import moment from 'moment';

export const toUTC = (date?: string) => {
  return moment(date, "DD.MM.YYYY").format();
};

