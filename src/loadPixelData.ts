const bodyEl = document.getElementsByTagName("body")[0];

/**
 * Load an image and return its pixel data as <canvas> ImageData.
 *
 * @param imgSrc URL to an image to load.
 */
export default function loadPixelData(imgSrc: string): Promise<ImageData> {
  const canvas = document.createElement("canvas");
  bodyEl.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (ctx) {
    return new Promise(function(resolve, reject) {
      const image = new Image();

      image.addEventListener("load", function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        resolve(imageData);
      });

      image.addEventListener("error", reject);

      image.src = imgSrc;
    });
  } else {
    throw new Error("Canvas context not found");
  }
}
