function angleFromCenter(center, point)
{
    return Math.atan2(point.y - center.y, point.x - center.x);
}

function degrees(radians)
{
    return radians * (180 / Math.PI);
}

function getAngle(center, first, second)
{
    var angle1 = angleFromCenter(center, first);
    var angle2 = angleFromCenter(center, second);
    var angle = degrees(angle2 - angle1);

    return angle;
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

        var objectPosition = $(transform.template).position();
        transform.center = {x: objectPosition.left, y: objectPosition.top};

        $(this).addClass('active');
    },

    watch: function(event)
    {
        if(transform.active)
        {
         //   var angle = getAngle({x: transform.handle.left, y: transform.handle.top}, {x: event.clientX, y: event.clientY});
          //  
//            var angle = angleFromCenter(transform.center, {x: event.clientX, y: event.clientY}) * ;

            var angle = getAngle(transform.center, {x: transform.handle.left, y: transform.handle.top}, {x: event.clientX, y: event.clientY});
            $(transform.template).transform('rotate', angle + 'deg');

//            console.log();
        }
    },

    end: function(event)
    {
        transform.active = false;
        transform.element = false;
        $('.handle.active').removeClass('active');
    }
};
