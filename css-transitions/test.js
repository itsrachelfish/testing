$(document).ready(function()
{
    var position = {x: 0, y: 0};
    var $test = $('.test');
    var test = $test[0];
    
    $('body').on('click', '.controls input', function()
    {
        var data = this.dataset;
        
        if(data.action == "toggle")
        {
            $(this).siblings('span').toggleClass('active inactive');
            $test.toggleClass(data.class);
        }
        
        else if(data.action == "transform")
        {
            $test.css({'transform': data.value});
            position.x = 0;
            position.y = 0;
        }
        
        else if(data.action == "translate")
        {
            console.log(window.getComputedStyle(test));

            var delta = data.value.split(',');
            position.x += parseInt(delta[0]);
            position.y += parseInt(delta[1]);
            
            $test.css({'transform': 'translate('+position.x+'px, '+position.y+'px)'});
        }
        
        else if(data.action == "magic")
        {
            $test.removeClass('active-transition');
            $test.removeAttr('style');
   
            $test.addClass('init-transition');
            $test.css({'transform': 'translate(300px, 300px)'});
            test.dataset.transform = 'translate(0px, 0px)';
        }
    });
    
    $('body').on('transitionend', '.init-transition', function()
    {
        console.log("Init ended!");

        $(this).removeClass('init-transition');
        $(this).addClass('active-transition');
        $test.css({'transform': this.dataset.transform});
    });

    $('body').on('transitionend', '.active-transition', function()
    {
        console.log("Transition ended!");
        
        $(this).removeClass('active-transition');
        $(this).removeAttr('style');
    });
});
