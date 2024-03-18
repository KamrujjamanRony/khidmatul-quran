export interface LocationModel {
  latitude: number | null;
  longitude: number | null;
}
export interface PrayTimesParams {
    imsak: string;
    dhuhr: string;
    asr: string;
    highLats: string;
    [key: string]: string;
}

export interface PrayerParams {
    fajr: string;
    isha: string;
    maghrib: string;
    midnight: string;
    [key: string]: string;
}

export interface PrayerTimes {
    imsak?: any;
    Shari?: any;
    fajr?: any;
    fajrT?: any;
    sunrise?: any;
    dhuhr?: any;
    dhuhrT?: any;
    asr?: any;
    sunset?: any;
    maghrib?: any;
    isha?: any;
    midnight?: any;
    [key: string]: any;
  }
export interface PrayerTimesT {
    imsak: any;
    Shari: any;
    fajr?: any;
    fajrT: any;
    sunrise: any;
    dhuhr?: any;
    dhuhrT: any;
    asr: any;
    sunset: any;
    maghrib: any;
    isha: any;
    midnight: any;
    [key: string]: any;
  }
export interface PrayerTimes1 {
    imsak: any;
    Shari: any;
    fajr?: any;
    fajrT: any;
    sunrise: any;
    dhuhr?: any;
    dhuhrT: any;
    asr: any;
    sunset: any;
    maghrib: any;
    isha: any;
    midnight: any;
    [key: string]: any;
  }