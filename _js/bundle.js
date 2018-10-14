"use strict";
var svgNameSpace = "http://www.w3.org/2000/svg";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
if (ctx) {
    var image_1 = new Image();
    image_1.src = "example.png";
    image_1.onload = function () {
        ctx.drawImage(image_1, 0, 0);
        var imageData = ctx.getImageData(0, 0, image_1.width, image_1.height);
        var width = imageData.width;
        var height = imageData.height;
        var length = imageData.data.length;
        var radius = 5;
        var factor = radius * 2;
        var svg = document.createElementNS(svgNameSpace, "svg");
        svg.setAttribute("viewBox", "0 0 " + width * factor + " " + height * factor);
        svg.setAttribute("width", "" + width * factor);
        svg.setAttribute("height", "" + height * factor);
        document.getElementsByTagName("body")[0].appendChild(svg);
        for (var i = 0; i < length; i += 4) {
            var pixelNum = i / 4;
            var x = pixelNum % width;
            var y = Math.floor(pixelNum / width);
            var offset = y % 2 ? radius : 0;
            var r = imageData.data[i];
            var g = imageData.data[i + 1];
            var b = imageData.data[i + 2];
            var pixel = document.createElementNS(svgNameSpace, "circle");
            pixel.setAttribute("r", radius.toString());
            pixel.setAttribute("cx", (x * radius * 2 + offset).toFixed(0));
            pixel.setAttribute("cy", (y * radius * 2).toFixed(0));
            pixel.setAttribute("fill", "rgb(" + r + "," + g + "," + b + ")");
            svg.appendChild(pixel);
        }
    };
}
else {
    throw new Error("Canvas context not found");
}
