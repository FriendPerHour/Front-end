export function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);

  if (seconds < 0) return `لحظات`;
  if (seconds < 60) return ` ${seconds} ثانية`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return ` ${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return ` ${hours} ساعة`;
  const days = Math.floor(hours / 24);
  if (days < 30) return ` ${days} يوم`;
  const months = Math.floor(days / 30);
  if (months < 12) return ` ${months} شهر`;
  const years = Math.floor(months / 12);
  return ` ${years} سنة`;
}
