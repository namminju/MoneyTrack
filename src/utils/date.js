import { format, parseISO, isValid } from 'date-fns';

const dateUtil = {

  formatDate: (input, formatString) => {
    let date;

    if (typeof input === 'string') {
      date = parseISO(input);
    }
    else {
      date = input;
    }

    if (!isValid(date)) {
      throw new Error('Invalid date');
    }

    return format(date, formatString);
  },


}

export default dateUtil;