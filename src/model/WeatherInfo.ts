export interface WeatherInfo {
    dt: number;
    timezone: number;
    name: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
    wind: {
      speed: number;
    };
  }