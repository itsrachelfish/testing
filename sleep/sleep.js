$(document).ready(function()
{
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var normal =
    [
        {
            name: 'Sleep',
            color: '#ccc',
            days: [0, 1, 2, 3, 4, 5, 6],
            hours: [23, 0, 1, 2, 3, 4, 5, 6],
        },

        {
            name: 'Work',
            color: '#99f',
            days: [0, 1, 2, 3, 4],
            hours: [9, 10, 11, 12, 13, 14, 15, 16]
        }
    ];

    var rachel =
    [
        {
            name: 'Business Hours',
            color: '#99f',
            days: [0, 1, 2, 3, 4],
            hours: [9, 10, 11, 12, 13, 14, 15, 16]
        }
    ];

    for(var i = 0, l = days.length * 2; i < l; i++)
    {
        var index = i % 7
        var today = days[index];

        var day = $('<div class="day" data-day="'+today+'"><div class="title">'+today+'</div></div>');
        var time = $('<div class="time"></div>');

        for(var iTime = 0, lTime = 24; iTime < lTime; iTime++)
        {
            var hour = $('<div class="hour" data-hour="'+iTime+'" title="'+iTime+'">&nbsp;</div>');

            // Loop through normal daily events
            $.each(normal, function(event_index, event)
            {
                if(event.days.indexOf(index) > -1 && event.hours.indexOf(iTime) > -1)
                {
                    hour.css('background-color', event.color);
                    hour.attr('title', iTime + " " + event.name);
                }
            });

            time.append(hour);
        }

        day.append(time);
        $('.normal').append(day);
    }

    for(var i = 0, l = days.length * 2; i < l; i++)
    {
        var index = i % 7
        var today = days[index];

        var day = $('<div class="day" data-day="'+today+'"><div class="title">'+today+'</div></div>');
        var time = $('<div class="time"></div>');

        for(var iTime = 0, lTime = 24; iTime < lTime; iTime++)
        {
            var hour = $('<div class="hour" data-hour="'+iTime+'" title="'+iTime+'">&nbsp;</div>');

            // Loop through rachel's daily events
            $.each(rachel, function(event_index, event)
            {
                if(event.days.indexOf(index) > -1 && event.hours.indexOf(iTime) > -1)
                {
                    hour.css('background-color', event.color);
                    hour.attr('title', iTime + " " + event.name);
                }
            });

            time.append(hour);
        }

        day.append(time);
        $('.rachel').append(day);
    }
});
