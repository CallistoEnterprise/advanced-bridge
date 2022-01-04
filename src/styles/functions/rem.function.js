module.exports = function (pixels, value = 18) {
  return Number(pixels.replace('px', '')) / value + 'rem';
};
