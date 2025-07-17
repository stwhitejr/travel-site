const sharp = require('sharp');
const {exiftool} = require('exiftool-vendored');
// const path = require('path');

const generateCoordinates = (gps) => {
  return [gps.GPSLatitude, gps.GPSLongitude];
};

const mergeTags = (tags, tags2 = []) => {
  return [
    ...[...tags, ...tags2].reduce((acc, tag) => {
      // Forgot to convert this earlier
      if (tag === 'dog') {
        acc.add('king');
      } else {
        acc.add(tag);
      }

      return acc;
    }, new Set()),
  ];
};

const getImageMetadata = async (filePath) => {
  // const tagsByFileName = require('../../output/labels_by_filename');
  // const fileName = path.basename(filePath);
  // const tagsFromJsonFile = tagsByFileName[fileName] || [];

  const image = sharp(filePath);
  const imageMetadata = await exiftool.read(filePath);

  const tags = imageMetadata.Keywords;

  return {
    image,
    metadata: {
      coordinates: generateCoordinates(imageMetadata),
      camera: imageMetadata.Model,
      date: imageMetadata.DateTimeCreated,
      tags: mergeTags(
        Array.isArray(tags) ? tags : tags ? [tags] : []
        // tagsFromJsonFile
      ),
      rating: imageMetadata.Rating,
      orientation: imageMetadata.Orientation === 1 ? 'landscape' : 'portrait',
    },
  };
};

module.exports = getImageMetadata;
