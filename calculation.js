// slow function
module.exports = function calculation(number) {
  let result = 0;
  for (var i = Math.pow(number, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
  return Math.floor(result);
};
