const svgNameSpace = "http://www.w3.org/2000/svg";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx) {
  const image = new Image();
  image.src = "example.png";
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const width = imageData.width;
    const height = imageData.height;
    const length = imageData.data.length;
    const radius = 5;
    const factor = radius * 2;

    const svg = document.createElementNS(svgNameSpace, "svg");
    svg.setAttribute("viewBox", `0 0 ${width * factor} ${height * factor}`);
    svg.setAttribute("width", `${width * factor}`);
    svg.setAttribute("height", `${height * factor}`);
    document.getElementsByTagName("body")[0].appendChild(svg);

    for (let i = 0; i < length; i += 4) {
      const pixelNum = i / 4;
      const x = pixelNum % width;
      const y = Math.floor(pixelNum / width);
      const offset = y % 2 ? radius : 0;
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      const pixel = document.createElementNS(svgNameSpace, "circle");
      pixel.setAttribute("r", radius.toString());
      pixel.setAttribute("cx", (x * radius * 2 + offset).toFixed(0));
      pixel.setAttribute("cy", (y * radius * 2).toFixed(0));
      pixel.setAttribute("fill", `rgb(${r},${g},${b})`);
      svg.appendChild(pixel);
    }
  };
} else {
  throw new Error("Canvas context not found");
}
