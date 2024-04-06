export const KM_PER_MILE = 1.60934 as const;

export const convertToKm = (miles: number) => {
  return parseFloat((miles * KM_PER_MILE).toFixed(2));
};
