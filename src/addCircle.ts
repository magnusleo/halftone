import { svgNameSpace } from "./common";

/**
 * Add a circle to an SVG element.
 *
 * @param svg SVGElement to add the circle to.
 * @param radius Radius of the circle in pixels.
 * @param x X-position of the circle's center in pixels.
 * @param y Y-position of the circle's center in pixels.
 * @param hue Hue of the circle (0..360)
 * @param saturation Saturation of the circle (0..100)
 * @param lightness  Lightness (value) of the circle (0..100)
 */
export default function addCircle(
  svg: SVGSVGElement,
  radius: number,
  x: number,
  y: number,
  hue: number,
  saturation: number,
  lightness: number
): void {
  const pixel = document.createElementNS(svgNameSpace, "circle");
  pixel.setAttribute("r", radius.toPrecision(3));
  pixel.setAttribute("cx", x.toFixed(0));
  pixel.setAttribute("cy", y.toFixed(0));
  pixel.setAttribute(
    "fill",
    `hsl(${hue}, ${saturation.toFixed(0)}%, ${lightness.toFixed(0)}%)`
  );
  svg.appendChild(pixel);
}
