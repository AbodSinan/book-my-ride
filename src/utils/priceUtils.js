export const calculatePrice = ({ hourlyPrice, startDateTime, endDateTime }) => {
  const hourDiff = calculateHours({ startDateTime, endDateTime });

  return (hourDiff * hourlyPrice).toFixed(2);
};

export const calculateHours = ({ startDateTime, endDateTime }) => {
  const date1 = new Date(startDateTime);
  const date2 = new Date(endDateTime);

  const milisecDiff = Math.abs(date2.getTime() - date1.getTime());

  return milisecDiff / 1000 / 3600;
};
