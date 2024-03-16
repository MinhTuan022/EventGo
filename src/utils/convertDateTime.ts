import {appInfo} from './constants/appInfos';
import {numberToString} from './numberToString';

export class DateTime {
  static GetTime = (num: Date) => {
    const date = new Date(num);
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${numberToString(hours)}:${numberToString(
      date.getMinutes(),
    )} ${am_pm}`;
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

    return `${
      appInfo.monthNames[date.getMonth()]
    }`;
  };
}
