export const CELSIUS_TO_FAHRENHEIT = 273.15 as const;

export const convertToCelsius = (temp: number) => {
// return in tofixed 2 parsefloat
  return parseFloat((temp - CELSIUS_TO_FAHRENHEIT).toFixed(0));
};
