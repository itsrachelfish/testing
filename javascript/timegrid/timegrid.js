// Array of currently ignored elements
var ignored = [];

// Function to set or remove a class on elements below your current hover position
function activateBelow(event)
{
    var classes = ['slot', 'shift', 'column'];
    var target = document.elementFromPoint(event.clientX, event.clientY);

    // Stop looping once we've reached the bottom of the document
    if(target == document.body)
    {
        return;
    }

    $(target).style({'pointer-events': 'none'});
    ignored.push(target);

    if($(target).hasClass(classes.join(' '), 'or'))
    {
        $(target).addClass('active');
    }

    // Special case to activate times for columns
    if($(target).hasClass('column'))
    {
        var index = $(target).index();
        $('.time').eq(index).addClass('active');
    }

    activateBelow(event);
}

// Function to reset ignored elements to pointer-events auto
function resetIgnored()
{
    ignored.forEach(function(element)
    {
        $(element).style({'pointer-events': 'auto'});
    });

    ignored = [];
}

$(document).ready(function()
{
    $('.slot').on('mouseenter', function(event)
    {
        activateBelow(event);
        resetIgnored();
    });
    
    $('.slot').on('mousemove', function(event)
    {
        $('.slot.active, .shift.active, .column.active, .time.active').removeClass('active');
        activateBelow(event);
        resetIgnored();
    });

    $('.slot').on('mouseleave', function(event)
    {
        $('.slot.active, .shift.active, .column.active, .time.active').removeClass('active');
    });
});
