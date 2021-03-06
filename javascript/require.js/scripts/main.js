requirejs(['./basic', './random'], function ($, randomInt)
{
    /* Basic.js usage examples */
    console.log("Page loaded!");
    
    // Get the size of some elements
    console.log("Size of .hello:", $('.hello').size('inner'));
    console.log("Size of .world:", $('.world').size('outer'));

    // Get the sizes of every matched element
    console.log("Sizes of div, p:", $('div, p').size('both'));

    // Adding and removing classes
    setInterval(function()
    {
        if($('.world').hasClass('black'))
        {
            $('.world').removeClass('black');
        }
        else
        {
            $('.world').addClass('black');
        }
    }, 1000);

    // Bind some events
    $('.world').on('mousedown mouseup mouseenter mouseleave', function(event)
    {
        event.preventDefault();
        
        // Get the current size
        var size = parseInt($(this).style('font-size'));

        // Convert from px to pt
        size = Math.ceil(size * 0.75);
        
        // INCREASE IT!!!
        size++;

        // SUPER INCREASE IT!!!
        if(event.detail.super)
        {
            size += 10;
        }

        // Set the new size
        $(this).style({'font-size': size + 'pt'});
    });

    // Hide hello world on click
    $('.hello').on('click', function()
    {
        // "this" is a reference to the element where the event occured
        $(this).addClass('black');
        console.log('*poof*');
    });

    // Find a child selector within a specific element
    $('div').find('.hello').addClass('italic');

    // Select specific elements within a matched selector
    $('.dots .dot').eq(3).addClass('white');
    $('.dots .dot').eq(randomInt(0, 9)).addClass('white');

    // Clear the dots after 1 second
    setTimeout(function()
    {
        $('.dot').removeClass('white');
    }, 1000);

    // Loop over all dots and do something else
    $('.dot').each(function(index, element)
    {
        setTimeout(function()
        {
            $(element).addClass('white');
        }, 1100 + (index * 100));
    });

    // Change the style of an element
    $('.dots').style({'color': '#111', 'font-size': '30pt'});

    // Get the position of an element (relative to the page)
    console.log($('.hello').position());

    // Get the position of an element (relative to the window)
    console.log($('.hello').position('window'));

    // Find the scroll position of the window
    $(window).on('scroll', function()
    {
        console.log("Window scroll position:", $(this).scroll());
        console.log($('.hello').position());
        console.log($('.hello').position('window'));
    });

    // Trigger an event
    $('.trigger').on('click', function()
    {
        $('.world').trigger('mousedown', {super: true});
    });

    // Modify the content of some elements using strings
    $('.html').html("<b>Magic~</b>");
    $('.text').text("<u>Can't hack me!</u>");
    $('.example').prepend("Nice to meet you.");
    $('.example').append("See you later!");

    // Modify the content of elements using other elements
    var generated = document.createElement('p');
    $(generated).text('This is a generated element!');
    $(generated).style({'font-size': '5pt'});
    $('.example').prepend(generated);
    $('.example').append(generated);

    // Replace an element entirely
    $('.replace').replace("<b>Replaced!</b>");

    // Remove an element
    $('.remove').remove();

    // Modify some attributes
    $('.attr').attr('sweet', 'bro');
    $('.attr').attr('remove', false);
    $('.check').attr('checked', true);

    // Get the value of an attribute
    console.log($('.attr').attr('sweet'));

    // Modify some data attributes
    $('.data').data('sweet', 'bro');
    $('.data').data('awesome', 'thanks');

    // Get the value of a data attribute
    console.log($('.data').data('test'));

    // Let's look at the whole dataset
    console.log($('.data').el[0].dataset);

    // Set the value of an input
    $('.set').value('This is also a value!');

    // Get the value of an input
    console.log($('.get').value());

    // Check if an element is checked
    if($('.uncheck').prop('checked'))
    {
        console.log("It's checked!");

        // Uncheck it
        $('.uncheck').prop('checked', false);
    }

    function addDot()
    {
        // Clone a dot
        var dot = $('.dot').clone()[0];
        
        // Add it to the list of dots
        $('.dots').append(dot);
        $('.dots').append(' ');

        console.log($('.dot').length);
    }

    // Bind an event that only fires when a child selector is matched
    $('body').on('click', '.dot', addDot);

    // Stop adding dots if you click on hello world
    $('body').on('click', '.hello', function()
    {
        if(!$(this).hasClass('black magic'))
        {
            $(this).addClass('magic');
        }
        else
        {
            console.log("Spooky black magic!!~");
        }
        
        $('body').off('click', '.dot', addDot);
    });

    // Apply some CSS transformations
    $('.transform').transform('rotate', '30deg');
    $('.transform').transform('translate', '150px', '-150px');

    $('.transform2').transform({rotate: '29deg', translate: ['165px', '-145px']});

    // Get an element's parent
    console.log($('.hello').parent());
    console.log($('.child').parents('.parent'));
});
