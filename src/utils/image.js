/**
 * Read image as Data URL
 * @param {Blob} imageFile
 * @returns {Promise<HTMLCanvasElement>}
 */
export async function readImage(imageFile) {
   const canvas = document.createElement("canvas");
   const img = document.createElement("img");

   // create img element from File object
   img.src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(reader.result.toString());
      reader.readAsDataURL(imageFile);
   });

   await new Promise((resolve) => {
      img.onload = resolve;
   });

   // draw image in canvas element
   canvas.width = img.width;
   canvas.height = img.height;
   canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

   return canvas;
}

/**
 * Sets scale of `canvas`
 * @param {HTMLCanvasElement} canvas
 * @param {number} scale
 * @returns
 */
export function scaleCanvas(canvas, scale) {
   const scaledCanvas = document.createElement("canvas");
   scaledCanvas.width = canvas.width * scale;
   scaledCanvas.height = canvas.height * scale;

   scaledCanvas
      .getContext("2d")
      .drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

   return scaledCanvas;
}

/**
 * Optimize `image` based on `quality`
 * @param {Blob} image
 * @param {number} [maxHeight]
 * @param {number} [quality]
 */
export async function optimizeImage(image, maxHeight = 512, quality = 0.9) {
   let canvas = await readImage(image);

   while (canvas.height >= 2 * maxHeight) {
      canvas = scaleCanvas(canvas, 0.5);
   }

   if (canvas.height > maxHeight) {
      canvas = scaleCanvas(canvas, maxHeight / canvas.height);
   }

   return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/webp", quality);
   });
}
