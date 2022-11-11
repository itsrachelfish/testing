function radians(degrees)
{
    return  degrees * Math.PI / 180;
}

function degrees(radians)
{
    return radians * 180 / Math.PI;
}

var sweep =
{
    angle: 0,
    radius: 250,
    colors: ['hsl(285, 100%, 50%)', 'blue', 'red'],

    init: function()
    {
        sweep.canvas = $('canvas').el[0];
        var size = $(sweep.canvas).size();

        sweep.center =
        {
            x: size.width / 2,
            y: size.height / 2
        };

        sweep.canvas.width = size.width;
        sweep.canvas.height = size.height;

        sweep.context = sweep.canvas.getContext("2d");
        sweep.context.strokeStyle = 'red';

        window.requestAnimationFrame(sweep.animate);
    },

    draw: function(x, y)
    {
        sweep.context.beginPath();
        sweep.context.moveTo(sweep.center.x, sweep.center.y);
        sweep.context.lineTo(x, y);
        sweep.context.closePath();
        sweep.context.stroke();
    },

    refresh: function()
    {
        sweep.context.globalAlpha = 0.022;
        sweep.context.fillRect(0, 0, sweep.canvas.width, sweep.canvas.height);
        sweep.context.globalAlpha = 1;
    },

    animate: function()
    {
        sweep.refresh();

        var sweepX = sweep.center.x + (sweep.radius * Math.cos(radians(sweep.angle)));
        var sweepY = sweep.center.y + (sweep.radius * Math.sin(radians(sweep.angle)));

        sweep.draw(sweepX, sweepY);
        sweep.angle++;

        let colorAngle = sweep.angle * 0.44;

        sweep.context.strokeStyle = `hsl(${colorAngle}, 100%, 50%)`;
        window.requestAnimationFrame(sweep.animate);
    }
}

$(document).ready(function()
{
    sweep.init();
});

$(window).on('resize', function()
{
    sweep.init();
});
