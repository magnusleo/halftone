"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
if (ctx) {
    var image_1 = new Image();
    image_1.src = "example.png";
    image_1.onload = function () {
        ctx.drawImage(image_1, 0, 0);
        var imageData = ctx.getImageData(0, 0, image_1.width, image_1.height);
        console.log(imageData);
    };
}
else {
    throw new Error("Canvas context not found");
}
