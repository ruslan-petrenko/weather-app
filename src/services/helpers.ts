export function formatDate(date: Date) {
  const parsedDate = new Date(date);
  let hours = parsedDate.getHours()
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours + ' ' + ampm.toUpperCase()
}

