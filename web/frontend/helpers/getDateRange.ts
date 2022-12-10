import { DateRange, DateRangeOld } from '../constants/constants';
import {
  endOfMonth,
  endOfToday,
  endOfYear,
  endOfYesterday,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  startOfYesterday,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

interface DateFilterObject {
    start: Date;
    end: Date;
  }

const getDateRange = (range: DateRange | DateRangeOld): DateFilterObject => {
  let start;
  let end;

  switch (range) {
    case DateRange.Today:
      start = startOfToday();
      end = endOfToday();
      break;
    case DateRange.Yesterday:
      start = startOfYesterday();
      end = endOfYesterday();
      break;
    case DateRange.Last7Days:
      start = subDays(endOfToday(), 6);
      end = endOfToday();
      break;
    case DateRange.Last30Days:
      start = subDays(endOfToday(), 29);
      end = endOfToday();
      break;
    case DateRange.Last90Days:
      start = subDays(endOfToday(), 89);
      end = endOfToday();
      break;
    case DateRange.LastMonth: {
      const lastMonth = subMonths(new Date(), 1);
      start = startOfMonth(lastMonth);
      end = endOfMonth(lastMonth);
      break;
    }
    case DateRange.LastYear: {
      const lastYear = subYears(new Date(), 1);
      start = startOfYear(lastYear);
      end = endOfYear(lastYear);
      break;
    }
    case DateRange.WeekToDate:
      start = startOfWeek(new Date(), { weekStartsOn: 1 });
      end = endOfToday();
      break;
    case DateRange.MonthToDate:
      start = startOfMonth(new Date());
      end = endOfToday();
      break;
    case DateRange.YearToDate:
      start = startOfYear(new Date());
      end = endOfToday();
      break;
  }

  return {
    start,
    end,
  };
};

export default getDateRange;
