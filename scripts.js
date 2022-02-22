var canvas = new fabric.Canvas('c');
var imgHeight, imgWidth;
document.getElementById("uploadedImg").onchange = function(e) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.src = e.target.result;
    image.onload = function() {
      var img = new fabric.Image(image);
      img.set({
        left: 0,
        top: 0,
      });
      imgWidth = img.width * img.scaleX;
      imgHeight = img.height * img.scaleY;
      const x = img.scaleX;
      const y = img.scaleY;
      console.log(x,y)
      
      img.scaleToWidth(110);
      canvas.centerObject(img).add(img).setActiveObject(img).renderAll();
      //Mouse Scroll In and Scroll Out
      canvas.on("mouse:move", function(event) {
        currentMouseY = Math.round((event.e.y - canvas._offset.top));
        currentMouseX = Math.round((event.e.x - canvas._offset.left));
        console.log(currentMouseX,currentMouseY);
    });
      canvas.on('mouse:wheel', function(opt) {
        var delta = opt.e.deltaY;
        const amnt = opt.e.deltaY < 0 ? 1.1 : .9;
        // console.log(amnt)
        var zoom = canvas.getZoom();
        zoom = zoom + delta/200;
        if (zoom > 20) zoom = 20;
        if (zoom < 1) zoom = 1;
        console.log(zoom)
        canvas.zoomToPoint(new fabric.Point(currentMouseX,currentMouseY),zoom)
        console.log(currentMouseX,currentMouseY);
        // canvas.setZoom(zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
        var vpt = this.viewportTransform;
        if (vpt[4] >= 0) {
            this.viewportTransform[4] = 0;
        } else if (vpt[4] < canvas.getWidth() - imgWidth * zoom) {
            this.viewportTransform[4] = canvas.getWidth() - imgWidth * zoom;
        }
        if (vpt[5] >= 0) {
             this.viewportTransform[5] = 0;
        } else if (vpt[5] < canvas.getHeight() - imgHeight * zoom) {
              this.viewportTransform[5] = canvas.getHeight() - imgHeight * zoom;
        }
      })
         
    }
  }
  reader.readAsDataURL(e.target.files[0]);
}
// Clear All Objects
document.getElementById("remove").onclick = function() {myFunction()};

function myFunction() {
    canvas.clear().renderAll(); 
    window.location.reload();
}

//Save Image
var imageSaver = document.getElementById('download');
imageSaver.addEventListener('click', saveImage, false);

function saveImage(e) {
    // var object = canvas.getActiveObject();
    // if (!object){
    //     alert('No Image to Download');
    //     return '';
    // }
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "canvas.png";
    link.href = image;
    link.click();
}
 
//Delete Objects
var objects = document.getElementById('objects');
objects.addEventListener('click', deleteObjects, false);

function deleteObjects(e) {
    var object = canvas.getActiveObject();
    if (!object){
        alert('No Image Found!!!!');
        return '';
    }
    canvas.remove(object);
}


//Reset to original position
// var reset = document.getElementById('reset');
// reset.addEventListener('click',resetImage, false);

// function resetImage(e) {

//   canvas.setZoom(1);
// }





