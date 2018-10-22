import colorConvert from "color-convert";

interface IHSL {
  hue: number;
  saturation: number;
  value: number;
}

const HUE = 0;
const SATURATION = 1;
const VALUE = 2;

/**
 * Get the average hue, saturation and value of a region from an image.
 *
 * @param x x-coordinate for the top-left corner of the are to average.
 * @param y y-coordinate for the top-left corner of the are to average.
 * @param imageWidth Width of the imageData (number of pixels on a line).
 * @param imageData The image to get pixel values from.
 * @param options
 * @param options.saturation Saturation multiplier. 0..1 decreases and >1 increases. Defaults to 1.
 * @param options.size Side of the square area to average (in pixels). Defaults to 1.
 */
export default function getAreaHSL(
  x: number,
  y: number,
  imageWidth: number,
  imageData: ImageData,
  { saturation = 1, size = 1 } = {}
): IHSL {
  let totalHue = 0;
  let totalSaturation = 0;
  let totalValue = 0;

  for (let xOffset = 0; xOffset < size; xOffset++) {
    const yi = y + xOffset;
    for (let yOffset = 0; yOffset < size; yOffset++) {
      const xi = x + xOffset;
      const imagePoint = yi * imageWidth * 4 + xi * 4;

      const r = imageData.data[imagePoint];
      const g = imageData.data[imagePoint + 1];
      const b = imageData.data[imagePoint + 2];
      const hsl = colorConvert.rgb.hsl([r, g, b]);
      totalHue += hsl[HUE];
      totalSaturation += hsl[SATURATION] * saturation;
      totalValue += hsl[VALUE];
    }
  }

  const sampleCount = size * size;

  return {
    hue: totalHue / sampleCount,
    saturation: totalSaturation / sampleCount,
    value: totalValue / sampleCount
  };
}
