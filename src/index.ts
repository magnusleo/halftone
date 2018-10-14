const svgNameSpace = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(svgNameSpace, "svg");
svg.setAttribute("viewBox", "0 0 210 340");
svg.setAttribute("height", "210");
svg.setAttribute("width", "340");
document.getElementsByTagName("body")[0].appendChild(svg);

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (ctx) {
  const image = new Image();
  image.src = "example.png";
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const width = imageData.width;
    const radius = 5;

    for (let i = 0; i < imageData.data.length; i += 4) {
      const pixelNum = i / 4;
      const x = pixelNum % width;
      const y = Math.floor(pixelNum / width);
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      const pixel = document.createElementNS(svgNameSpace, "circle");
      pixel.setAttribute("r", radius.toString());
      pixel.setAttribute("cx", (x * radius * 2).toFixed(0));
      pixel.setAttribute("cy", (y * radius * 2).toFixed(0));
      pixel.setAttribute("fill", `rgb(${r},${g},${b})`);
      svg.appendChild(pixel);
    }
  };
} else {
  throw new Error("Canvas context not found");
}
