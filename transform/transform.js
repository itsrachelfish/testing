function degrees(radians)
{
    return radians * (180 / Math.PI);
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
        line.refresh();

        x -= line.offset.x;
        y -= line.offset.y;

        line.context.strokeStyle = 'white';
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

var transform =
{
    active: false,

    init: function(selector)
    {
        line.init();

        var template = $('.template').clone();
        $(template).find('.object').el[0].appendChild($(selector).el[0]);
        $(template).removeClass('template');

        $('.flex').el[0].appendChild(template);
        transform.template = template;

        $(template).find('.handle').on('mousedown', transform.start);
        $('body').on('mousemove', transform.watch);
        $('body').on('mouseup', transform.end);
    },

    start: function(event)
    {
        transform.active = true;
        transform.element = event.target;

        var size = $(transform.template).size();
        var position = $(transform.template).position();

        transform.center =
        {
            x: size.width / 2,
            y: size.height / 2
        };

console.log(size, position);

        transform.offset =
        {
            x: position.left,
            y: position.top
        };

        transform.rotateOffset = parseInt($(this).data('rotate'));
        $(this).addClass('active');
    },

    watch: function(event)
    {
        if(transform.active)
        {
            console.log(transform.center, transform.offset);

    line.draw(event.clientX, event.clientY);
/*
        // Center the box in the middle of the screen
        x = box.center.x;
        y = box.center.y;

        // Center the box based on its size
        x -= box.size / 2;
        y -= box.size / 2;
*/
        // Get the angle of the line relative to the origin
        var difference =
        {
            x: event.clientX - transform.offset.x - transform.center.x,
            y: event.clientY - transform.offset.y - transform.center.y
        };

console.log( degrees(Math.atan2(difference.y, difference.x)), transform.rotateOffset);

            var angle = degrees(Math.atan2(difference.y, difference.x)) + transform.rotateOffset;
            $(transform.template).transform('rotate', angle + 'deg');
        }
    },

    end: function(event)
    {
        transform.active = false;
        transform.element = false;
        $('.handle.active').removeClass('active');
    }
};
