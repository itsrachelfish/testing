var sweep =
{
    init: function()
    {
        sweep.canvas = $('canvas').el[0];

        var size = $(sweep.canvas).size();
        var position = $(sweep.canvas).position();

        sweep.center =
        {
            x: size.width / 2,
            y: size.height / 2
        };

        sweep.offset =
        {
            x: position.left,
            y: position.top
        };

        sweep.canvas.width = size.width;
        sweep.canvas.height = size.height;

        sweep.context = sweep.canvas.getContext("2d");
        sweep.context.strokeStyle = 'red';
    },

    draw: function(x, y)
    {
        x -= sweep.offset.x;
        y -= sweep.offset.y;

        sweep.context.beginPath();
        sweep.context.moveTo(sweep.center.x, sweep.center.y);
        sweep.context.lineTo(x, y);
        sweep.context.closePath();
        sweep.context.stroke();
    },

    refresh: function()
    {
        sweep.context.clearRect(0, 0, sweep.canvas.width, sweep.canvas.height);
    },
}

$(document).ready(function()
{
    sweep.init();

    $('canvas').on('mousemove', function(event)
    {
        // comment out sweep.refresh() if you want to relive 90s screensavers
        sweep.refresh();
        sweep.draw(event.clientX, event.clientY);
    });
});

$(window).on('resize', function()
{
    sweep.init();
});
