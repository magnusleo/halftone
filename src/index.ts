const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (ctx) {
  const image = new Image();
  image.src = "example.png";
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    console.log(imageData);
  };
} else {
  throw new Error("Canvas context not found");
}
