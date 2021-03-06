import addCircle from "./addCircle";
import { svgNameSpace } from "./common";
import getAreaHSL from "./getAreaHSL";

/**
 * Create an SVG halftone version of an bitmap image.
 *
 * @param imageData Image data array from a <canvas> element.
 * @param options
 * @param options.canvasScale Factor to scale up the resulting canvas with. Defaults to 1.
 * @param options.hue Hue offset. Range: -360..360. Defaults to 0.
 * @param options.invert Invert lightness-to-size calculations and use a black background. Defaults to false.
 * @param options.lightness Lightness (value) multiplier. 0..1 decreases and >1 increases. Defaults to 1.
 * @param options.offset Offset every other line 50%. Defaults to false.
 * @param options.pixelScale Factor to scale the resulting pixels with. Defaults to 1.
 * @param options.resolution Number of pixels to combine into one circle. Defaults to 1.
 * @param options.saturation Saturation multiplier. 0..1 decreases and >1 increases. Defaults to 1.
 * @returns An SVG element with the desired halftone.
 */
export default function createHalftone(
  imageData: ImageData,
  {
    canvasScale = 1,
    hue = 0,
    invert = false,
    lightness = 1,
    offset = false,
    pixelScale = 1,
    resolution = 1,
    saturation = 1
  } = {}
): SVGSVGElement {
  const width = imageData.width;
  const height = imageData.height;
  const length = imageData.data.length;
  const radius = resolution / 2;

  const svg = document.createElementNS(svgNameSpace, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", `${width * canvasScale}`);
  svg.setAttribute("height", `${height * canvasScale}`);
  if (invert) {
    svg.style.backgroundColor = "#000";
  }

  for (let i = 0; i < length; i += 4 * resolution) {
    let pixelNum = i / 4;
    let x = pixelNum % width;

    if (x + resolution > width) {
      // We are beyond the image's right edge
      // Go to start of this line
      i -= x * 4;
      x = 0;
      // Jump 1 resolution unit down
      i += width * resolution * 4;
      pixelNum = i / 4;
    }

    const y = Math.floor(pixelNum / width);

    let xOffset = 0;
    if (offset && y % 2) {
      xOffset = radius;
    }

    const hsl = getAreaHSL(x, y, width, imageData, {
      hue,
      lightness,
      saturation,
      size: resolution
    });
    const luma = invert ? hsl.rawLightness / 100 : 1 - hsl.rawLightness / 100;
    const scaleFactor = Math.sqrt(luma) * pixelScale;

    if (scaleFactor > 0.01) {
      addCircle(
        svg,
        scaleFactor * radius,
        x + xOffset + radius,
        y + radius,
        hsl.hue,
        hsl.saturation,
        hsl.lightness
      );
    }
  }
  return svg;
}
