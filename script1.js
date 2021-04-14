var files1 = document.getElementById('import1');
var files2 = document.getElementById('import2');

var base_image1;
var base_image2;
var canvas_b = document.getElementById('before');
var ctx_b = canvas_b.getContext('2d');
ctx_b.strokeStyle = "#FF0000";
var canvas_a = document.getElementById('after');
var ctx_a = canvas_a.getContext('2d');
ctx_a.strokeStyle = "#FF0000";
var locA, locB;
total_width = 2880;
total_height = 2304;

files1.addEventListener("change", function (e) {
    number = e.target.files.length;
    if (number > 0 && e.target.files[0].type.match('image.*')) {
        var file = e.target.files[0];
        loadImage(file, ctx_b, 1);
    } else {
        alert("not an image, please try again");
    }
});

files2.addEventListener("change", function (e) {
    number = e.target.files.length;
    if (number > 0 && e.target.files[0].type.match('image.*')) {
        var file = e.target.files[0];
        loadImage(file, ctx_a, 2);
    } else {
        alert("not an image, please try again");
    }
});

function loadImage(image, ctx, idx) {
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        if (idx == 1) {
            base_image1 = new Image();
            base_image1.src = e.target.result;
            base_image1.onload = function() {
                total_width = base_image1.width;
                total_height = base_image1.height;
                ctx.drawImage(base_image1, 0, 0, total_width, total_height, 0, 0, total_width / 4, total_height / 4);
            }
        } else {
            base_image2 = new Image();
            base_image2.src = e.target.result;
            base_image2.onload = function() {
                total_width = base_image2.width;
                total_height = base_image2.height;
                ctx.drawImage(base_image2, 0, 0, total_width, total_height, 0, 0, total_width / 4, total_height / 4);
            }
        }
    };
    fileReader.readAsDataURL(image);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

document.addEventListener('mousedown', function(e) {
    e.preventDefault();
    locA = getMousePos(canvas_b, e);
});

document.addEventListener('mouseup', function(e) {
    e.preventDefault();
    locB = getMousePos(canvas_b, e);
    
    if (base_image1) {
        ctx_b.clearRect(0, 0, canvas_b.width, canvas_b.height);
        ctx_a.clearRect(0, 0, canvas_a.width, canvas_a.height);

        ctx_b.drawImage(base_image1, 0, 0, total_width, total_height, 0, 0, total_width / 4, total_height / 4);
        ctx_a.drawImage(base_image2, 0, 0, total_width, total_height, 0, 0, total_width / 4, total_height / 4);

        ctx_b.strokeRect(locA.x, locA.y, (locB.x - locA.x), (locB.y - locA.y));
        ctx_a.strokeRect(locA.x, locA.y, (locB.x - locA.x), (locB.y - locA.y));

        x = locA.x * 4;
        y = locA.y * 4;
        width = (locB.x - locA.x) * 4;
        height = (locB.y - locA.y) * 4;

        offset_x = total_width / 4;
        offset_y = 0;

        offset_x += 360 - width / 2;
        offset_y += 270 - height / 2;

        ctx_b.drawImage(base_image1, x, y, width, height, offset_x, offset_y, width, height);
        ctx_a.drawImage(base_image2, x, y, width, height, offset_x, offset_y, width, height);
    }
});
