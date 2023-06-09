export const typeofName = [
    "Apartments", //0
    "House",//1
    "Villa",//2
    "Shop",//3
    "Office",//4
    "Hostel",//5
    "Pg",//6
    "Plot",//7
    "Farm"//8
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
      label: "Select",
      value: "",
    },
    {
      label: "Vitrified Tiles",
      value: "Vitrified Tiles",
    },
    {
      label: "Ceramic Porcelain Tiles",
      value: "Ceramic Porcelain Tiles",
    },
    {
      label: "Anti Skid Tiles",
      value: "Anti Skid Tiles",
    },
    {
      label: "Marble Granite Tiles",
      value: "Marble Granite Tiles",
    },
    {
      label: "Wooden flooring",
      value: "Wooden flooring",
    },
    {
      label: "RAK/laminated wooden flooring",
      value: "RAK/laminated wooden flooring",
    },
    {
      label: "Wood Finish Vinyl Flooring",
      value: "Wood Finish Vinyl Flooring",
    },
  ];
  
  
  export const sizeData = [
    {
      label: "Select",
      value: "",
    },
    {
      label: "Feet",
      value: "Feet",
    },
    {
      label: "Meters",
      value: "Meters",
    },
    {
      label: "Yards",
      value: "Yards",
    },
    {
      label: "Bigha",
      value: "Bigha",
    },
    {
      label: "Acres",
      value: "Acres",
    },
    {
      label: "Hectares",
      value: "Hectares",
    },
  ];
  export const carpet_areaData = [
    {
      label: "Feet",
      value: "Feet",
    },
    {
      label: "Meters",
      value: "Meters",
    },
    {
      label: "Yards",
      value: "Yards",
    },
  ];
  export const facing_road_width_inData = [
    {
      label: "Select",
      value: "",
    },
    {
      label: "Feet",
      value: "Feet",
    },
    {
      label: "Meters",
      value: "Meters",
    },
  ];
  
  export const FacingSide = [
    {
      label: "Select",
      value: "",
    },
    {
      label: "North",
      value: "North",
    },
    {
      label: "South",
      value: "South",
    },
    {
      label: "East",
      value: "East",
    },
    {
      label: "West",
      value: "West",
    },
    {
      label: "Northeast",
      value: "Northeast",
    },
    {
      label: "Northwest",
      value: "Northwest",
    },
    {
      label: "southeast",
      value: "southeast",
    },
    {
      label: "southwest",
      value: "southwest",
    },
  ];
  
  
  export const RoomType = [
    {
      label: "Select",
      value: "",
    },
    {
      label: "Single Bed",
      value: "Single Bed",
    },
    {
      label: "Double Sharing",
      value: "Double Sharing",
    },
    {
      label: "Triple Sharing",
      value: "Triple Sharing",
    },
    {
      label: "Multiple Sharing",
      value: "Multiple Sharing",
    }
  ];
  
  
  