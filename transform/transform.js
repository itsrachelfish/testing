var transform =
{
    active: false,

    init: function(selector)
    {
        var template = $('.template').clone();
        $(template).find('.object').el[0].appendChild($(selector).el[0]);
        $(template).removeClass('template');

        $('.flex').el[0].appendChild(template);

        $(template).find('.handle').on('mousedown', transform.start);
        $('body').on('mousemove', transform.watch);
        $('body').on('mouseup', transform.end);
    },

    start: function(event)
    {
        transform.active = true;

        $(this).addClass('active');

        console.log(event);
    },

    watch: function(event)
    {
        if(transform.active)
        {

        }
    },

    end: function(event)
    {
        transform.active = false;

        $('.handle.active').removeClass('active');
    }
};
