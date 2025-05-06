export interface IWeatherResponce {
    current: IWeatherCurrent;
    hourly: IWeatherHourly
}

export type IWeatherCurrentValue = 0 | 1 ;

export interface IWeatherCurrent {

    is_day: IWeatherCurrentValue;
    rain: IWeatherCurrentValue;
    snowfall: IWeatherCurrentValue;
}

export interface IWeatherHourly {
    temperature_2m: number[],
}