import moment from 'moment';

export const timeAgo = (dateString: string) => {
  return moment(dateString).fromNow();
};
