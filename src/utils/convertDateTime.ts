import {appInfo} from './constants/appInfos';
import {numberToString} from './numberToString';
import moment from 'moment';

export class DateTime {
  static GetTime = (num: Date) => {
    const date = new Date(num);
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${numberToString(hours)}:${numberToString(
      date.getMinutes(),
    )} ${am_pm}`;
  };

  static GetTime24h = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getHours())}:${numberToString(
      date.getMinutes(),
    )}`;
  };
  static GetDate = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getDate())} ${
      appInfo.monthNames[date.getMonth()]
    }, ${date.getFullYear()}`;
  };

  static GetDateNotYear = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getDate())} ${
      appInfo.monthNames[date.getMonth()]
    }`;
  };
  static GetOnlyDate = (num: Date) => {
    const date = new Date(num);

    return `${numberToString(date.getDate())}`;
  };
  static GetOnlyMonth = (num: Date) => {
    const date = new Date(num);

    return `${appInfo.monthNames[date.getMonth()]}`;
  };

  static MergeDate = (num1: Date, num2: Date) => {
    const time1 = new Date(num1);
    const time2 = new Date(num2);

    // Chuyển đổi time1 và time2 thành các đối tượng moment
    const momentTime1 = moment(time1);
    const momentTime2 = moment(time2);

    // Lấy ngày từ time1
    const dateFromTime1 = momentTime1.format('YYYY-MM-DD');

    // Lấy giờ và phút từ time2
    const timeFromTime2 = momentTime2.format('HH:mm');

    // Ghép ngày và giờ phút lại với nhau và chuyển đổi thành định dạng ISO 8601
    const combinedDateTime = moment(
      `${dateFromTime1} ${timeFromTime2}`,
    ).toISOString();
    return combinedDateTime;
  };
}
