import createHalftone from "./createHalftone";
import loadPixelData from "./loadPixelData";

const bodyEl = document.getElementsByTagName("body")[0];

(async function() {
  const pixelImageData = await loadPixelData("example-pixel.png");
  const pixelExample = createHalftone(pixelImageData);
  bodyEl.appendChild(pixelExample);

  bodyEl.appendChild(document.createElement("br"));

  const photoImageData = await loadPixelData("example-photo.jpg");
  const photoExample = createHalftone(photoImageData, 10);
  bodyEl.appendChild(photoExample);
})();
