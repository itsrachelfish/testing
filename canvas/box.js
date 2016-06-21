function radians(degrees)
{
    return  degrees * Math.PI / 180;
}

var box =
{
    size: 200,
    speed: 0,
    angle: 0,

    init: function()
    {
        box.canvas = $('canvas').el[0];
        box.context = box.canvas.getContext("2d");

        // Get the initial size of the canvas
        box.resize();

        // Start spinning the box
        box.spin();

        window.requestAnimationFrame(box.refresh);
    },

    draw: function(x, y)
    {
        if(x === undefined || y === undefined)
        {
            x = box.x;
            y = box.y;
        }
        else
        {
            box.x = x;
            box.y = y;
        }

        // Remove the offset from the margin around the page
        x -= box.offset.x;
        y -= box.offset.y;

        // Center the box
        x -= box.size / 2;
        y -= box.size / 2;

        box.context.strokeStyle = 'white';
        box.context.save();

        box.context.translate(x + box.size/2,y+box.size/2);
        box.context.rotate(box.angle*(Math.PI/180));
        box.context.translate(-(x+box.size/2),-(y+box.size/2));

        box.context.strokeRect(x, y, box.size, box.size);

        box.context.stroke();
        box.context.restore();


    },

    spin: function()
    {
        setTimeout(function()
        {
            box.angle += box.speed;
            box.spin();
        }, Math.abs(10 / box.speed));
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

        // forever and ever
        window.requestAnimationFrame(box.refresh);
    },
}

$(document).ready(function()
{
    box.init();

    $('canvas').on('mousemove', function(event)
    {
        box.draw(event.clientX, event.clientY);
    });

    $('canvas').on('mousedown', function(event)
    {
        // Right click to slow down
        if(event.button == 2)
        {
            box.speed += 0.1;
        }
        // Left click to speed up!
        else
        {
            box.speed -= 0.1;
        }
    });

    $('canvas').on('contextmenu', function(event)
    {
        event.preventDefault();
    });
});

$(window).on('resize', function()
{
    box.resize();
});
