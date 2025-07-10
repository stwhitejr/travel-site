const sharp = require('sharp');
const {exiftool} = require('exiftool-vendored');

const generateCoordinates = (gps) => {
  return [gps.GPSLatitude, gps.GPSLongitude];
};

const getImageMetadata = async (filePath) => {
  const image = sharp(filePath);
  const imageMetadata = await exiftool.read(filePath);

  const tags = imageMetadata.Keywords;

  return {
    image,
    metadata: {
      coordinates: generateCoordinates(imageMetadata),
      camera: imageMetadata.Model,
      date: imageMetadata.DateTimeCreated,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
      rating: imageMetadata.Rating,
      orientation: imageMetadata.Orientation === 1 ? 'landscape' : 'portrait',
    },
  };
};

module.exports = getImageMetadata;
