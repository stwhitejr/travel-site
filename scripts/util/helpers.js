const path = require('path');

const validatePathAsImage = (
  file,
  validExtensions = ['.jpg', '.jpeg', '.png']
) => {
  const ext = path.extname(file).toLowerCase();
  return validExtensions.includes(ext);
};

module.exports = {
  validatePathAsImage,
};
