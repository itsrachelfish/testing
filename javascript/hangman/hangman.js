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
    state: 'waiting', // Possible states: waiting, playing, win, lose
    answers:
    {
        right: [],
        wrong: [],
    },

    play: function()
    {
        game.state = 'playing';
        game.show('guess');

        // Pick a random word
        var index = Math.floor(Math.random() * words.length);
        game.word = words[index];

        $('.letters span').remove();

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

        game.timeout = setTimeout(function()
        {
            game.show('guess');
        }, 1000);

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

        game.timeout = setTimeout(function()
        {
            game.show('guess');
        }, 1000);
    },

    show: function(title)
    {
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
            clearTimeout(game.timeout);

            game.timeout = setTimeout(function()
            {
                game.show('win');
            }, 1000);
        }
    },

    wrong: function(answer)
    {
        game.show('wrong');
        game.answers.wrong.push(answer);

        $('.hangman .hidden').eq(0).removeClass('hidden');

        if(!$('.hangman .hidden').el.length)
        {
            clearTimeout(game.timeout);

            game.timeout = setTimeout(function()
            {
                game.show('lose');
                $('.lose .word span').text(game.word);
            }, 1000);
        }
    }
};

$(document).ready(function()
{
    $('.play button').on('click', function()
    {
        game.play();
    });

    $('.guess input').on('input', function()
    {
        game.guess($(this).value());
        $(this).value('');
    });
});
