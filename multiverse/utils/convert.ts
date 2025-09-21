export default timeConvert;

function timeConvert(time_in_ms: String) {
  let time = Number(time_in_ms);
  function fullMinutes() {
    return time / 1000;
  }
  function fullHours() {
    return time / 60000;
  }
  return {
    time: time,
    fullMinutes: fullMinutes,
    fullHours: fullHours,
  };
}
