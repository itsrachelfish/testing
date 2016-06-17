var transform =
{
    init: function(selector)
    {
        var template = $('.template').clone();
        $(template).find('.object').el[0].appendChild($(selector).el[0]);
        $(template).removeClass('template');

        $('.flex').append(template);
    }
};
