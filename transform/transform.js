function degrees(radians)
{
    return radians * (180 / Math.PI);
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

        var position = $(transform.template).position();
        transform.center = {x: position.left, y: position.top};
        transform.offset = $(this).data('rotate');

        $(this).addClass('active');
    },

    watch: function(event)
    {
        if(transform.active)
        {
            var difference =
            {
                x: event.clientX - transform.center.x,
                y: event.clientY - transform.center.y
            };

            var angle = degrees(Math.atan2(difference.y, difference.x)) + transform.offset;
            $(transform.template).transform('rotate', Math.atan2(difference.y, difference.x) + 'rad');
        }
    },

    end: function(event)
    {
        transform.active = false;
        transform.element = false;
        $('.handle.active').removeClass('active');
    }
};
