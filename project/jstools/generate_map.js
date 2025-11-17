const fs = require("fs");
const { loadImage } = require("canvas");
const { drawRoute } = require("./drawHelpers");

void async function (sysArgs) {
  const [imgFile, routeFile, cornersCoords, outputType, timezone] = sysArgs;
  const img = await loadImage(imageFile);
  const cornersRaw = cornersCoords.split(",");
  const corners = {
    top_left: {lat: parseFloat(cornersRaw[0]), lon: parseFloat(cornersRaw[1])},
    top_right: {lat: parseFloat(cornersRaw[2]), lon: parseFloat(cornersRaw[3])},
    bottom_right: {lat: parseFloat(cornersRaw[4]), lon: parseFloat(cornersRaw[5])},
    bottom_left: {lat: parseFloat(cornersRaw[6]), lon: parseFloat(cornersRaw[7])},
  };
  const showHeader = outputType.includes("h");
  const showRoute = outputType.includes("r");
  const routeJSON = fs.readFileSync(routeFile, { encoding: "utf8", flag: "r" });
  const routeRaw = JSON.parse(routeJSON);
  const route = routeRaw.map((p) => {
    return { time: p.time * 1e3, latLon: p.latlon };
  });
  const canvas = await drawRoute(
    img,
    corners,
    route,
    showHeader,
    showRoute,
    timezone
  );
  const dataURI = canvas.toDataURL("image/jpeg", { quality: 0.9 });
  process.stdout.write(dataURI);
  process.exit(0);
}(process.argv.slice(2));
