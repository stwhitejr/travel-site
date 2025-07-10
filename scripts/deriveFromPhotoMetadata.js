const fs = require('fs-extra');

const LOCATIONS_FILE = './output/locations.json';
const TAGS_FILE = './output/tags.json';
const PHOTO_METADATA_FILE = './output/photo_metadata_with_address.json';

/**
 * Determining distance between 2 sets of coordinates
 */
const COORDINATE_DISTANCE_THRESHOLD_KM = 2;

const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
};

const checkRoughCoordinateMatch = (coordinatesA, coordinatesB) => {
  return (
    haversineDistance(coordinatesA, coordinatesB) <=
    COORDINATE_DISTANCE_THRESHOLD_KM
  );
};

/**
 * Look up address with coordinates
 */
async function reverseGeocode([lat, lon], fileName) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) node-fetch/1.0',
    },
  });

  if (!res.ok) {
    throw new Error(`Geocoding failed: ${res.status} for: ${fileName}`);
  }

  const data = await res.json();
  return data;
}

const dedupeLocations = (locations) => {
  const seen = new Set();
  const deduped = [];

  for (const item of locations) {
    const key = item.address;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }
  return deduped;
};

/**
 * Get a list of locations from photo metadata coordinates
 * Get a list of tags from photo metdata
 */

async function deriveFromPhotoMetadata() {
  const photo_metadata = require('../output/photo_metadata.json');
  const locations = [];
  const tags = new Set();
  for (let index = 0; index < photo_metadata.length; index++) {
    const photoMetadata = photo_metadata[index];

    if (!photoMetadata.coordinates) {
      continue;
    }
    (Array.isArray(photoMetadata.tags)
      ? photoMetadata.tags
      : photoMetadata.tags
      ? [photoMetadata.tags]
      : []
    ).forEach((tag) => {
      tags.add(tag);
    });

    const existingLocationEntry = locations.find((loc) =>
      checkRoughCoordinateMatch(loc.coordinates, photoMetadata.coordinates)
    );

    if (!!existingLocationEntry) {
      photoMetadata.locationAddress = existingLocationEntry.address;
      continue;
    }

    const data = await reverseGeocode(
      photoMetadata.coordinates,
      photoMetadata.file_name
    );

    const location = {
      coordinates: photoMetadata.coordinates,
      address: data.display_name,
      title:
        data.name ||
        data.address.city ||
        data.address.hamlet ||
        data.address.county,
    };
    locations.push(location);
    // Add this field so we can use it as a foreign key to tie photo_metadata and locations together
    photoMetadata.locationAddress = location.address;
    // Rate limit
    await new Promise((resolve) => setTimeout(resolve, 1100));
  }

  await fs.writeJson(LOCATIONS_FILE, dedupeLocations(locations), {spaces: 2});
  await fs.writeJson(PHOTO_METADATA_FILE, photo_metadata, {spaces: 2});
  await fs.writeJson(TAGS_FILE, [...tags], {spaces: 2});
  console.log('Generated locations.json');
  console.log('Generated photo_metadata_with_address.json');
  console.log('Generated tags.json');
}

if (require.main === module) {
  deriveFromPhotoMetadata();
} else {
  module.exports = deriveFromPhotoMetadata;
}
