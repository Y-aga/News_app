import moment from 'moment';

export const timeAgo = (dateString: string | undefined) => {
  return moment(dateString).fromNow();
};
