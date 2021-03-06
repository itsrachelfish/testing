function radians(degrees)
{
    return  degrees * Math.PI / 180;
}

function degrees(radians)
{
    return radians * 180 / Math.PI;
}

var line =
{
    init: function()
    {
        line.canvas = $('canvas').el[0];

        var size = $(line.canvas).size();
        var position = $(line.canvas).position();

        line.center =
        {
            x: size.width / 2,
            y: size.height / 2
        };

        line.offset =
        {
            x: position.left,
            y: position.top
        };

        line.canvas.width = size.width;
        line.canvas.height = size.height;

        line.context = line.canvas.getContext("2d");
    },

    draw: function(x, y)
    {
        x -= line.offset.x;
        y -= line.offset.y;

        line.context.strokeStyle = 'red';
        line.context.beginPath();
        line.context.moveTo(line.center.x, line.center.y);
        line.context.lineTo(x, y);
        line.context.closePath();
        line.context.stroke();
    },

    refresh: function()
    {
        line.context.clearRect(0, 0, line.canvas.width, line.canvas.height);
    },
}

var box =
{
    size: 200,
    angle: 0,

    init: function()
    {
        box.canvas = $('canvas').el[0];
        box.context = box.canvas.getContext("2d");

        // Get the initial size of the canvas
        box.resize();
    },

    draw: function(clientX, clientY)
    {
        // Center the box in the middle of the screen
        x = box.center.x;
        y = box.center.y;

        // Center the box based on its size
        x -= box.size / 2;
        y -= box.size / 2;

        // Offset the client cursor position
        clientX -= box.offset.x;
        clientY -= box.offset.y;

        // Get the angle of the line relative to the origin
        var deltaY = clientY - box.center.y;
        var deltaX = clientX - box.center.x;

        box.angle = degrees(Math.atan2(deltaY, deltaX)) + 45;

        box.context.strokeStyle = 'white';
        box.context.save();

        box.context.translate(x + box.size/2,y+box.size/2);
        box.context.rotate(box.angle*(Math.PI/180));
        box.context.translate(-(x+box.size/2),-(y+box.size/2));

        box.context.strokeRect(x, y, box.size, box.size);
        box.context.restore();
    },

    resize: function()
    {
        var size = $(box.canvas).size();
        var position = $(box.canvas).position();

        box.center =
        {
            x: size.width / 2,
            y: size.height / 2
        };

        box.offset =
        {
            x: position.left,
            y: position.top
        };

        box.canvas.width = size.width;
        box.canvas.height = size.height;
    },

    refresh: function()
    {
        box.context.clearRect(0, 0, box.canvas.width, box.canvas.height);
        box.draw();
    },
}

$(document).ready(function()
{
    line.init();
    box.init();

    $('canvas').on('mousemove', function(event)
    {
        line.refresh();
        line.draw(event.clientX, event.clientY);
        box.draw(event.clientX, event.clientY);
    });

    $('canvas').on('contextmenu', function(event)
    {
        event.preventDefault();
    });
});

$(window).on('resize', function()
{
    line.init();
    box.resize();
});
