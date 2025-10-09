export default convertTime;

function convertTime(timeInMilliseconds: String) {
  let timeInMs = Number(timeInMilliseconds);
  function getMinutes() {
    return timeInMs / 1000;
  }
  function getHours() {
    return timeInMs / 60000;
  }
  return {
    time: timeInMs,
    fullMinutes: getMinutes,
    fullHours: getHours,
  };
}
