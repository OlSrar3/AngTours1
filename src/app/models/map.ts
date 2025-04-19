export interface IWeatherResponce {
    current: IWeatherCurrent;
    hourly: IWeatherHourly
}

export type IWeatherValue = 0|1;

export interface IWeatherCurrent {

    is_day: IWeatherValue;
    rain: IWeatherValue;
    snowfall: IWeatherValue;
}

export interface IWeatherHourly {
tempreture_2m: number[],
}