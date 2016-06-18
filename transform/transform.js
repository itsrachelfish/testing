function getAngle(first, second)
{
    if(first.x < second.x)
    {
        return (Math.atan2((second.x - first.x), (first.y - second.y)) * 180 / Math.PI);
    }
    else
    {
        return 360 - (Math.atan2((first.x - second.x), (first.y - second.y)) * 180 / Math.PI);
    }
}

var transform =
{
    active: false,

    init: function(selector)
    {
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
        transform.handle = $(transform.element).position();

        $(this).addClass('active');
    },

    watch: function(event)
    {
        if(transform.active)
        {
            var angle = getAngle({x: transform.handle.left, y: transform.handle.top}, {x: event.clientX, y: event.clientY});
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
