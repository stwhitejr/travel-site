const sharp = require('sharp');
const {exiftool} = require('exiftool-vendored');
const path = require('path');

const hardCoords = {
  'glacierFloat.jpg': [48.6018067, -114.3283153],
  'glacierWaterRock.jpg': [48.6018067, -114.3283153],
  'glacierWaterRock3.jpg': [48.6018067, -114.3283153],
  'glacierWaterRock3.jpg': [48.6018067, -114.3283153],
  'lovell_canyon_sunset_1.jpg': [36.0430406, -115.6278103],
  'lovell_canyon_sunset_2.jpg': [36.0430406, -115.6278103],
  'montanacamp.jpg': [47.3080274, -114.8381135],
  'montanacampwithtrain.jpg': [47.3080274, -114.8381135],
};

const generateCoordinates = (gps, fileName) => {
  if (gps.GPSLatitude && gps.GPSLongitude) {
    return [gps.GPSLatitude, gps.GPSLongitude];
  }
  return hardCoords[fileName] || [0, 0];
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
  const fileName = path.basename(filePath);
  // const tagsFromJsonFile = tagsByFileName[fileName] || [];

  const image = sharp(filePath);
  const imageMetadata = await exiftool.read(filePath);

  const tags = imageMetadata.Keywords;

  return {
    image,
    metadata: {
      coordinates: generateCoordinates(imageMetadata, fileName),
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
