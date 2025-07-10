const locations = require('../output/locations.json');
const dupes = [];
locations.reduce((acc, location) => {
  if (acc[location.address]) {
    dupes.push(location);
    return acc;
  }
  acc[location.address] = location;
  return acc;
}, {});

console.log(dupes);
