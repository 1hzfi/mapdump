const fs = require("fs");
const { loadImage } = require("canvas");
const { drawRoute } = require("./drawHelpers");

void async function (sysArgs) {
  const [mapImageFile, mapImageCornersCoordsRaw, locationsFile, showHeaderRaw, showRouteRaw, timezone] = sysArgs;
  const mapImage = await loadImage(mapImageFile);
  const mapImageCornersCoordsArray = cornersCoords.split(",").map((val) => parseFloat(val));
  const mapImageCornersCoords = {
    top_left: {
      lat: mapImageCornersCoordsArray[0],
      lon: mapImageCornersCoordsArray[1]
    },
    top_right: {
      lat: mapImageCornersCoordsArray[2],
      lon: mapImageCornersCoordsArray[3]
    },
    bottom_right: {
      lat: mapImageCornersCoordsArray[4],
      lon: mapImageCornersCoordsArray[5]
    },
    bottom_left: {
      lat: mapImageCornersCoordsArray[6],
      lon: mapImageCornersCoordsArray[7]
    },
  };
  const showHeader = showHeaderRaw === "1";
  const showRoute = showRouteRaw === "1";
  const locationsRaw = fs.readFileSync(locationsFile, { encoding: "utf8", flag: "r" });
  const locationsJson = JSON.parse(locationsRaw);
  const locations = routeJson.map((p) => {
    return { time: p.time * 1e3, latLon: p.latlon };
  });
  const canvas = await drawRoute(
    mapImage,
    mapImageCornersCoords,
    locations,
    showHeader,
    showRoute,
    timezone
  );
  const dataURI = canvas.toDataURL("image/jpeg", { quality: 0.9 });
  process.stdout.write(dataURI);
}(process.argv.slice(2));
