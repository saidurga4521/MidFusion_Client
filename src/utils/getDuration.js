const getDuration = (endsAt, scheduledAt) => {
  const createdDate = new Date(scheduledAt);
  const endDate = new Date(endsAt);
  const ms = endDate - createdDate;

  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  const duration = parts.join(" ") || "0 minutes";
  return duration;
};
export default getDuration;
