import createHalftone from "./createHalftone";
import loadPixelData from "./loadPixelData";

const bodyEl = document.getElementsByTagName("body")[0];

(async function() {
  const pixelImageData = await loadPixelData("example-pixel.png");
  const pixelExample = createHalftone(pixelImageData, { canvasScale: 10 });
  bodyEl.appendChild(pixelExample);

  bodyEl.appendChild(document.createElement("br"));

  const photoImageData = await loadPixelData("example-photo.jpg");
  const photoExample = createHalftone(photoImageData, {
    lightness: 0.8,
    pixelScale: 1.1,
    resolution: 10,
    saturation: 1.5
  });
  bodyEl.appendChild(photoExample);
})();
