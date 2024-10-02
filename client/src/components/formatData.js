const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (time) => {
  const newDate = new Date(time);
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const date = newDate.getDate();

  return `${date < 10 ? "0" + date : date}-${months[month]}-${year}`;
};
