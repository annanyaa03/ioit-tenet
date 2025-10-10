export function getEventStatus(targetDate?: Date): string {
  const now = new Date();
  const eventDate = targetDate ? targetDate.getTime() : now.getTime();
  const timeDifference = eventDate - now.getTime();

  if (now.getTime() > eventDate) {
    return 'Event Completed';
  }

  if (timeDifference <= 0) {
    return '';
  }

  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutesLeft = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  );
  const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (daysLeft > 0) {
    return `${daysLeft} days left`;
  }
  if (hoursLeft > 0) {
    return `${hoursLeft} hours left`;
  }
  if (minutesLeft > 0) {
    return `${minutesLeft} minutes left`;
  }
  return `${secondsLeft} seconds left`;
}
