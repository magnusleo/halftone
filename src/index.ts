import getAreaHSL from "./getAreaHSL";

const bodyEl = document.getElementsByTagName("body")[0];
const svgNameSpace = "http://www.w3.org/2000/svg";

function createHalftone(imgSrc: string, resolution = 1) {
  const canvas = document.createElement("canvas");
  bodyEl.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const image = new Image();
    image.src = imgSrc;
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const width = imageData.width;
      const height = imageData.height;
      const length = imageData.data.length;
      const radius = resolution / 2;

      const fragment = document.createDocumentFragment();
      const svg = document.createElementNS(svgNameSpace, "svg");
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", `${width}`);
      svg.setAttribute("height", `${height}`);
      fragment.appendChild(svg);

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
          const pixel = document.createElementNS(svgNameSpace, "circle");
          pixel.setAttribute("r", (scaleFactor * radius).toString());
          pixel.setAttribute("cx", (x + offset).toFixed(0));
          pixel.setAttribute("cy", y.toFixed(0));
          pixel.setAttribute("fill", `hsl(${hue}, ${saturation}%, ${value}%)`);
          svg.appendChild(pixel);
        }
      }
      bodyEl.appendChild(fragment);
    };
  } else {
    throw new Error("Canvas context not found");
  }
}

createHalftone("example-pixel.png");
createHalftone("example-photo.jpg", 10);
