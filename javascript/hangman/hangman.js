(function()
{
    const words =
    [
        'dog',
        'cat',
        'permaculture',
        'petrichor',
        'farts',
        'butts',
        'wetfish',
        'lol',
        'help',
        'imstuckinthegame',
        'hello',
        'world',
        'america',
        'freedom',
        'eagles',
        'flagburning',
        'insidejob',
        'weed',
        'democracy',
        'fakenews',
        'onion',
        'garlic',
        'lamp',
        'squid',
        'vorhaut',
        'carbon',
        'laser',
        'sprint',
        'focus',
        'slime',
        'aardvark',
        'avacado',
        'orange',
        'green',
        'grapes',
        'floor',
        'broom',
        'mop',
        'car',
        'honk',
        'forum',
        'wiki',
        'internet',
        'flower',
        'friendship',
        'glove',
        'water',
        'picture',
        'bird',
        'computer',
        'poppy',
    ];

    var game =
    {
        play: function()
        {
            game.show('guess');
            $('.guess input').el[0].focus();

            // Reset saved answers
            game.answers =
            {
                right: [],
                wrong: [],
            };

            // Make sure the man is hidden when the game starts
            $('.hangman img').addClass('hidden');
            $('.hangman .murder').removeClass('hidden');
            $('.guesses').addClass('hidden');

            // Pick a random word
            var index = Math.floor(Math.random() * words.length);
            game.word = words[index];

            $('.letters span').remove();
            $('.guesses span').remove();

            var letters = game.word.split('');

            letters.forEach(function(letter)
            {
                $('.letters').append('<span>&nbsp;</span>');
            });
        },

        guess: function(letter)
        {
            if(game.answers.right.indexOf(letter) > -1 || game.answers.wrong.indexOf(letter) > -1)
            {
                game.already();
                return;
            }

            game.show('guess', 1000);

            if(game.word.indexOf(letter) > -1)
            {
                game.right(letter);
            }
            else
            {
                game.wrong(letter);
            }
        },

        already: function()
        {
            game.show('already');
            game.show('guess', 1000);
        },

        show: function(title, delay)
        {
            if(delay)
            {
                if(game.timeout)
                {
                    clearTimeout(game.timeout);
                }

                game.timeout = setTimeout(function()
                {
                    game.show(title);
                }, delay);
            }
            $('.title > div').addClass('hidden');
            $('.title > .' + title).removeClass('hidden');
        },

        right: function(answer)
        {
            game.show('right');

            var letters = game.word.split('');

            letters.forEach(function(letter, index)
            {
                if(letter === answer)
                {
                    game.answers.right.push(answer);
                    $('.letters span').eq(index).text(letter);
                }
            });

            if(game.answers.right.length === game.word.length)
            {
                game.show('win', 1000);
            }
        },

        wrong: function(answer)
        {
            game.show('wrong');
            game.answers.wrong.push(answer);

            $('.guesses').removeClass('hidden');
            $('.guesses').append("<span>" + answer + "</span>");

            $('.hangman .hidden').eq(0).removeClass('hidden');

            if(!$('.hangman .hidden').el.length)
            {
                $('.lose .word span').text(game.word);
                game.show('lose', 1000);
            }
        }
    };

    $(document).ready(function()
    {
        $('.play button, .win button, .lose button').on('click', function()
        {
            game.play();
        });

        $('.guess input').on('input', function()
        {
            game.guess($(this).value().toLowerCase());
            $(this).value('');
        });
    });
}());
