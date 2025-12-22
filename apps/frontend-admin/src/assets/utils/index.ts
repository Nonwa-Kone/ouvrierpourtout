import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const formatDate = (
  date: Date | string,
  format = 'DD/MM/YYYY HH:mm'
) => {
  const now = dayjs();
  const diffInMinutes = now.diff(date, 'minute');
  const diffInHours = now.diff(date, 'hour');
  const diffInDays = now.diff(date, 'day');

  if (diffInMinutes < 60) {
    return `il y a ${
      diffInMinutes < 1 ? diffInMinutes + ' s' : diffInMinutes + ' min'
    }`; // "il y a x minutes" ou "il y a x secondes"
  } else if (diffInHours < 24) {
    return `il y a ${diffInHours}h`;
  } else if (diffInDays === 1) {
    return `hier à ${dayjs(date).format('HH:mm')}`;
  } else if (diffInDays === 2) {
    return `avant-hier à ${dayjs(date).format('HH:mm')}`;
  } else {
    return dayjs(date).format(format);
  }
};

export function helperInitial(lastName: string, firstNames: string) {
  if (!lastName || !firstNames) return '';
  return lastName.charAt(0) + firstNames.charAt(0);
}
