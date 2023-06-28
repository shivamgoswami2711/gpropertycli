export const typeofName = [
  'Apartments', //0
  'House', //1
  'Villa', //2
  'Shop', //3
  'Office', //4
  'Hostel', //5
  'Pg', //6
  'Plot', //7
  'Farm', //8
];

export function BedroomsNumber() {
  const numbersArray = [];

  for (let i = 1; i <= 15; i++) {
    const obj = {
      label: `${i}`,
      value: `${i}`,
    };
    numbersArray.push(obj);
  }

  return numbersArray;
}

export const materialType = [
  {
    label: 'Select',
    value: '',
  },
  {
    label: 'Vitrified Tiles',
    value: 'Vitrified Tiles',
  },
  {
    label: 'Ceramic Porcelain Tiles',
    value: 'Ceramic Porcelain Tiles',
  },
  {
    label: 'Anti Skid Tiles',
    value: 'Anti Skid Tiles',
  },
  {
    label: 'Marble Granite Tiles',
    value: 'Marble Granite Tiles',
  },
  {
    label: 'Wooden flooring',
    value: 'Wooden flooring',
  },
  {
    label: 'RAK/laminated wooden flooring',
    value: 'RAK/laminated wooden flooring',
  },
  {
    label: 'Wood Finish Vinyl Flooring',
    value: 'Wood Finish Vinyl Flooring',
  },
];

export const sizeData = [
  {
    label: 'Select',
    value: '',
  },
  {
    label: 'Feet',
    value: 'Feet',
  },
  {
    label: 'Meters',
    value: 'Meters',
  },
  {
    label: 'Yards',
    value: 'Yards',
  },
  {
    label: 'Bigha',
    value: 'Bigha',
  },
  {
    label: 'Acres',
    value: 'Acres',
  },
  {
    label: 'Hectares',
    value: 'Hectares',
  },
];
export const carpet_areaData = [
  {
    label: 'Feet',
    value: 'Feet',
  },
  {
    label: 'Meters',
    value: 'Meters',
  },
  {
    label: 'Yards',
    value: 'Yards',
  },
];
export const facing_road_width_inData = [
  {
    label: 'Select',
    value: '',
  },
  {
    label: 'Feet',
    value: 'Feet',
  },
  {
    label: 'Meters',
    value: 'Meters',
  },
];

export const FacingSide = [
  {
    label: 'Select',
    value: '',
  },
  {
    label: 'North',
    value: 'North',
  },
  {
    label: 'South',
    value: 'South',
  },
  {
    label: 'East',
    value: 'East',
  },
  {
    label: 'West',
    value: 'West',
  },
  {
    label: 'Northeast',
    value: 'Northeast',
  },
  {
    label: 'Northwest',
    value: 'Northwest',
  },
  {
    label: 'southeast',
    value: 'southeast',
  },
  {
    label: 'southwest',
    value: 'southwest',
  },
];

export const RoomType = [
  {
    label: 'Select',
    value: '',
  },
  {
    label: 'Single Bed',
    value: 'Single Bed',
  },
  {
    label: 'Double Sharing',
    value: 'Double Sharing',
  },
  {
    label: 'Triple Sharing',
    value: 'Triple Sharing',
  },
  {
    label: 'Multiple Sharing',
    value: 'Multiple Sharing',
  },
];

export const PropertyStatus = [
  {
    label: 'Sell',
    value: 'sell',
  },
  {
    label: 'Rent',
    value: 'rent',
  },
  {
    label: 'Sold',
    value: 'sold',
  },
];

export const imageType = [
  {
    label: 'tag image',
    value: '',
  },
  {
    label: 'floorplan',
    value: 'floorplan',
  },
  {
    label: 'bedroom',
    value: 'bedroom',
  },
  {
    label: 'living',
    value: 'living',
  },
  {
    label: 'bathroom',
    value: 'bathroom',
  },
  {
    label: 'kitchen',
    value: 'kitchen',
  },
  {
    label: 'dining',
    value: 'dining',
  },
  {
    label: 'balcony',
    value: 'balcony',
  },
  {
    label: 'exterior',
    value: 'exterior',
  },
  {
    label: 'layoutplan',
    value: 'layoutplan',
  },
  {
    label: 'locationmap',
    value: 'locationmap',
  },
  {
    label: 'matserplan',
    value: 'matserplan',
  },
  {
    label: 'other',
    value: 'other',
  },
];

export function findInitialRegion(coordinates = []) {
  // Initialize the minimum and maximum latitude and longitude
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minlong = Infinity;
  let maxlong = -Infinity;

  let copycoordinates = [];
  for (let i = 0; i < coordinates.length; i++) {
    const {lat, long} = coordinates[i];
    if (
      Number(lat) < 36 &&
      Number(lat) > 7 &&
      Number(long) < 96 &&
      Number(long) > 68
    ) {
      copycoordinates.push(coordinates[i]);
    }
  }
  // Iterate through each coordinate and update the minimum and maximum values
  for (let i = 0; i < copycoordinates.length; i++) {
    const {lat, long} = copycoordinates[i];
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minlong = Math.min(minlong, long);
    maxlong = Math.max(maxlong, long);
  }

  // Calculate the center latitude and longitude
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minlong + maxlong) / 2;
  const deltaLat = Math.abs(maxLat - minLat) * 1.2;
  const deltaLng = Math.abs(maxlong - minlong) * 1.2;

  // Return the initial region object
  return {
    latitude: centerLat || 22.809754,
    longitude: centerLng || 78.321457,
    latitudeDelta: deltaLat || 1.07922,
    longitudeDelta: deltaLng || 1.0421,
  };
}
  
  
  
  