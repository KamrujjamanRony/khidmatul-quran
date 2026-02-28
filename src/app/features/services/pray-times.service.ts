import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PrayTimesService {
  private timeNames = {
    imsak: 'Imsak',
    Shari: 'Shari',
    fajrT: 'Fajr',
    sunrise: 'Sunrise',
    dhuhrT: 'Dhuhr',
    asr: 'Asr',
    sunset: 'Sunset',
    maghrib: 'Maghrib',
    isha: 'Isha',
    midnight: 'Midnight'
  };
  private timeFormat = '12h';
  private timeSuffixes = ['am', 'pm'];
  private invalidTime = '-----';
  private numIterations = 1;
  private offset: any = {};
  private lat!: number;
  private lng!: number;
  private elv!: number;
  private timeZone!: string;
  private jDate!: number;

  private methods: { name: string; params: any };



  constructor() {
    this.methods = {
      name: 'University of Islamic Sciences, Karachi',
      params: {
        fajr: '18',
        isha: '18',
        maghrib: '0 min',
        midnight: 'Standard',
      },
    };
    for (const i in this.timeNames) {
      this.offset[i] = 0;
    }
  };

  private setting: any = {
    imsak: '10 min',
    dhuhr: '0 min',
    asr: 'Standard',
    highLats: 'NightMiddle',
  };

  setMethod() {
    if (this.methods) {
      this.adjust();
    }
  }

  adjust() {
    for (const id in this.methods.params) {
      this.setting[id] = this.methods.params[id];
    }
  }

  tune(timeOffsets: { [x: string]: any; }) {
    for (const i in timeOffsets) {
      this.offset[i] = timeOffsets[i];
    }
  }

  getSetting() {
    return this.setting;
  }

  getOffsets() {
    return this.offset;
  }

  getDefaults() {
    return this.methods;
  }

  getTimes(date: any, coords: number[], timezone: string | number, dst: string | number, format: string) {
    this.lat = 1 * coords[0];
    this.lng = 1 * coords[1];
    this.elv = coords[2] ? 1 * coords[2] : 0;
    this.timeFormat = format || this.timeFormat;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();


    if (date.constructor === Date) {
      date = [year, month, day];
    }

    if (typeof timezone === 'undefined' || timezone === 'auto') {
      timezone = this.getTimeZone(date);
    }

    if (typeof dst === 'undefined' || dst === 'auto') {
      dst = this.getDst(date);
    }

    const timeZ = 1 * Number(timezone) + (1 * Number(dst) ? 1 : 0);
    this.timeZone = timeZ.toString();
    this.jDate = this.julian(year, month, day) - this.lng / (15 * 24);

    return this.computeTimes();
  }



  getFormattedTime(time: number, format: string, suffixes: string[] | undefined) {
    if (isNaN(time)) return this.invalidTime;
    if (format == 'Float') return time;
    suffixes = suffixes || this.timeSuffixes;
    time = this.fixHour(time + 0.5 / 60);
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    const suffix = format == '12h' ? suffixes[hours < 12 ? 0 : 1] : '';
    const hour = format == '24h' ? this.twoDigitsFormat(hours) : ((hours + 12 - 1) % 12 + 1);
    return hour + ':' + this.twoDigitsFormat(minutes) + (suffix ? ' ' + suffix : '');
  }

  midDay(time: number) {
    const eqt = this.sunPosition(this.jDate + time).equation;
    const noon = this.fixHour(12 - eqt);

    return noon;
  }

  sunAngleTime(angle: number, time: number, direction: string | undefined) {
    const decl = this.sunPosition(this.jDate + time).declination;
    const noon = this.midDay(time);
    const t = (1 / 15) * this.arccos((-this.sin(angle) - this.sin(decl) * this.sin(this.lat)) / (this.cos(decl) * this.cos(this.lat)));
    return noon + (direction == 'ccw' ? -t : t);
  }

  asrTime(factor: number, time: number) {
    const decl = this.sunPosition(this.jDate + time).declination;
    const angle = -this.arccot(factor + this.tan(Math.abs(this.lat - decl)));
    return this.sunAngleTime(angle, time, undefined);
  }

  sunPosition(jd: number) {
    const D = jd - 2451545.0;
    const g = this.fixAngle(357.529 + 0.98560028 * D);
    const q = this.fixAngle(280.459 + 0.98564736 * D);
    const L = this.fixAngle(q + 1.915 * this.sin(g) + 0.020 * this.sin(2 * g));
    const R = 1.00014 - 0.01671 * this.cos(g) - 0.00014 * this.cos(2 * g);
    const e = 23.439 - 0.00000036 * D;
    const RA = this.arctan2(this.cos(e) * this.sin(L), this.cos(L)) / 15;
    const eqt = q / 15 - this.fixHour(RA);
    const decl = this.arcsin(this.sin(e) * this.sin(L));
    return { declination: decl, equation: eqt };
  }

  julian(year: number, month: number, day: number) {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
    return JD;
  }

  computePrayerTimes(times: any) {
    times = this.dayPortion(times);
    const params = this.setting;
    const imsak = this.sunAngleTime(Number(this.eval(params['imsak'])), times['imsak'], 'ccw');
    const fajrA = this.sunAngleTime(Number(this.eval(params['fajr'])), times['fajr'], 'ccw');
    const fajrT = fajrA + 0.05;
    const Shari = fajrA - 0.05;
    const sunrise = this.sunAngleTime(this.riseSetAngle(), times['sunrise'], 'ccw');
    const dhuhr = this.midDay(times['dhuhr']);
    const dhuhrT = dhuhr + 0.05;
    const asr = this.asrTime(Number(this.asrFactor(2)), times['asr']);
    const sunset = this.sunAngleTime(this.riseSetAngle(), times['sunset'], undefined);
    const maghrib = this.sunAngleTime(Number(this.eval(params['maghrib'])), times['maghrib'], undefined);
    const isha = this.sunAngleTime(Number(this.eval(params['isha'])), times['isha'], undefined);

    return {
      imsak: imsak,
      Shari: Shari,
      fajrT: fajrT,
      sunrise: sunrise,
      dhuhrT: dhuhrT,
      asr: asr,
      sunset: sunset,
      maghrib: maghrib,
      isha: isha
    };
  }


  computeTimes() {
    let times: any = {
      imsak: 5,
      Shari: 5,
      fajr: 5,
      sunrise: 6,
      dhuhr: 12,
      asr: 13,
      sunset: 18,
      maghrib: 18,
      isha: 18,
    };

    for (let i = 1; i <= this.numIterations; i++) {
      times = this.computePrayerTimes(times);
    }

    times = this.adjustTimes(times);

    times.midnight = this.setting['midnight'] === 'Standard'
      ? times.sunset + this.timeDiff(times.sunset, times.fajrT) / 2
      : times.sunset + this.timeDiff(times.sunset, times.sunrise) / 2;

    times = this.tuneTimes(times);
    return this.modifyFormats(times);
  }

  adjustTimes(times: any) {
    const params = this.setting;
    for (const i in times) {
      times[i] += Number(this.timeZone) - this.lng / 15;
    }

    if (params.highLats !== 'None') {
      times = this.adjustHighLats(times);
    }

    if (this.isMin(params.imsak)) {
      times.imsak = times.fajr - Number(this.eval(params.imsak)) / 60;
    }

    if (this.isMin(params['maghrib'])) {
      times.maghrib = times.sunset + Number(this.eval(params['maghrib'])) / 60 + 0.05;
    }

    if (this.isMin(params['isha'])) {
      times.isha = times.maghrib + Number(this.eval(params['isha'])) / 60;
    }

    times.dhuhr += Number(this.eval(params.dhuhr)) / 60;
    return times;
  }

  asrFactor(asrParam: number) {
    const factor = { Standard: 1, Hanafi: 2 }[asrParam];
    return factor || this.eval(asrParam.toString());
  }

  riseSetAngle() {
    const angle = 0.0347 * Math.sqrt(this.elv);
    return 0.833 + angle;
  }

  tuneTimes(times: any) {
    for (const i in times) {
      times[i] += this.offset[i] / 60;
    }
    return times;
  }

  modifyFormats(times: any) {
    for (const i in times) {
      times[i] = this.getFormattedTime(times[i], this.timeFormat, undefined);
    }
    return times;
  }

  adjustHighLats(times: any) {
    const params = this.setting;
    const nightTime = this.timeDiff(times.sunset, times.sunrise);
    times.imsak = this.adjustHLTime(times.imsak, times.sunrise, Number(this.eval(params.imsak)), nightTime, 'ccw');
    times.fajr = this.adjustHLTime(times.fajr, times.sunrise, Number(this.eval(params['fajr'])), nightTime, 'ccw');
    times.isha = this.adjustHLTime(times.isha, times.sunset, Number(this.eval(params['isha'])), nightTime, undefined);
    times.maghrib = this.adjustHLTime(times.maghrib, times.sunset, Number(this.eval(params['maghrib'])), nightTime, 'ccw');
    return times;
  }

  adjustHLTime(time: number, base: number, angle: number, night: any, direction: string | undefined) {
    const portion = this.nightPortion(angle, night);
    const timeDiff = direction === 'ccw'
      ? this.timeDiff(time, base)
      : this.timeDiff(base, time);

    if (isNaN(time) || timeDiff > portion) {
      time = base + (direction === 'ccw' ? -portion : portion);
    }

    return time;
  }

  nightPortion(angle: number, night: number) {
    const method = this.setting.highLats;
    let portion = 1 / 2; // MidNight

    if (method === 'AngleBased') {
      portion = (1 / 60) * angle;
    }

    if (method === 'OneSeventh') {
      portion = 1 / 7;
    }

    return portion * night;
  }

  dayPortion(times: any) {
    for (const i in times) {
      times[i] /= 24;
    }
    return times;
  }

  getTimeZone(date: any[]) {
    const year = date[0];
    const t1 = this.gmtOffset([year, 0, 1]);
    const t2 = this.gmtOffset([year, 6, 1]);
    return Math.min(t1, t2);
  }

  getDst(date: any) {
    const isSame = this.gmtOffset(date) !== this.getTimeZone(date);
    // this.dtr(4)
    if (isSame) {
      return 1;
    } else {
      return 0;
    }
  }

  gmtOffset(date: any[]) {
    const localDate = new Date(date[0], date[1] - 1, date[2], 12, 0, 0, 0);
    const GMTString = localDate.toUTCString();
    const GMTDate = new Date(GMTString.substring(0, GMTString.lastIndexOf(' ') - 1));
    const hoursDiff = (Number(localDate) - Number(GMTDate)) / (1000 * 60 * 60);
    return hoursDiff;
  }

  eval(str: string) {
    return (str + '').split(/[^0-9.+-]/)[0];
  }

  isMin(arg: string) {
    return (arg + '').indexOf('min') !== -1;
  }

  timeDiff(time1: number, time2: number) {
    return this.fixHour(time2 - time1);
  }

  twoDigitsFormat(num: string | number) {
    return Number(num) < 10 ? '0' + num : num;
  }



  private dtr(d: any) {
    return (d * Math.PI) / 180.0;
  }
  private rtd(r: any) {
    return (r * 180.0) / Math.PI;
  }
  private sin(d: any) {
    return Math.sin(this.dtr(d));
  }
  private cos(d: any) {
    return Math.cos(this.dtr(d));
  }
  private tan(d: any) {
    return Math.tan(this.dtr(d));
  }
  private arcsin(d: any) {
    return this.rtd(Math.asin(d));
  }
  private arccos(d: any) {
    return this.rtd(Math.acos(d));
  }
  private arctan(d: any) {
    return this.rtd(Math.atan(d));
  }
  private arccot(x: any) {
    return this.rtd(Math.atan(1 / x));
  }
  private arctan2(y: any, x: any) {
    return this.rtd(Math.atan2(y, x));
  }
  private fixAngle(a: number) {
    return this.fix(a, 360)
  }
  private fixHour(a: number) {
    return this.fix(a, 24)
  }
  private fix(a: number, b: number) {
    a = a - b * (Math.floor(a / b));
    return (a < 0) ? a + b : a;
  }
}
