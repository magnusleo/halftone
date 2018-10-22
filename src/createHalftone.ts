import addCircle from "./addCircle";
import { svgNameSpace } from "./common";
import getAreaHSL from "./getAreaHSL";

/**
 * Create an SVG halftone version of an bitmap image.
 *
 * @param imageData Image data array from a <canvas> element.
 * @param options
 * @param options.lightness Lightness (value) multiplier. 0..1 decreases and >1 increases. Defaults to 1.
 * @param options.resolution Number of pixels to combine into one circle. Defaults to 1.
 * @param options.offset Offset every other line 50%. Defaults to false.
 * @param options.saturation Saturation multiplier. 0..1 decreases and >1 increases. Defaults to 1.
 * @returns An SVG element with the desired halftone.
 */
export default function createHalftone(
  imageData: ImageData,
  { lightness = 1, resolution = 1, offset = false, saturation = 1 } = {}
): SVGSVGElement {
  const width = imageData.width;
  const height = imageData.height;
  const length = imageData.data.length;
  const radius = resolution / 2;

  const svg = document.createElementNS(svgNameSpace, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height}`);

  for (let i = 0; i < length; i += 4 * resolution) {
    const pixelNum = i / 4;
    const x = pixelNum % width;
    if (x + resolution > width) {
      i += (width - x) * 4; // Jump to start of next line
      i += width * resolution * 4; // Jump 1 resolution unit down
      continue;
    }
    const y = Math.floor(pixelNum / width);

    let xOffset = 0;
    if (offset && y % 2) {
      xOffset = radius;
    }

    const hsl = getAreaHSL(x, y, width, imageData, {
      lightness,
      saturation,
      size: resolution
    });
    const luma = 1 - hsl.lightness / 100;
    const scaleFactor = Math.sqrt(luma);

    if (scaleFactor > 0.01) {
      addCircle(
        svg,
        scaleFactor * radius,
        x + xOffset,
        y,
        hsl.hue,
        hsl.saturation,
        hsl.lightness
      );
    }
  }
  return svg;
}
