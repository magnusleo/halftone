import addCircle from "./addCircle";
import { svgNameSpace } from "./common";
import getAreaHSL from "./getAreaHSL";

/**
 * Create an SVG halftone version of an bitmap image.
 *
 * @param imageData Image data array from a <canvas> element.
 * @param resolution Number of pixels to combine into one circle. Defaults to 1.
 * @returns An SVG element with the desired halftone.
 */
export default function createHalftone(
  imageData: ImageData,
  resolution = 1
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
    const offset = 0; // y % 2 ? radius : 0;

    const { hue, saturation, value } = getAreaHSL(
      x,
      y,
      width,
      resolution,
      imageData
    );
    const luma = 1 - value / 100;
    const scaleFactor = Math.sqrt(luma);

    if (scaleFactor > 0.01) {
      addCircle(
        svg,
        scaleFactor * radius,
        x + offset,
        y,
        hue,
        saturation,
        value
      );
    }
  }
  return svg;
}
