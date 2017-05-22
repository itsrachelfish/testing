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
    right: [],
    wrong: [],

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
            $('.letters').append('<span></span>');
        });
    },

    guess: function(letter)
    {
        if(game.right.indexOf(letter) > -1 || game.wrong.indexOf(letter) > -1)
        {
            game.already();
            return;
        }

        if(game.word.indexOf(letter) > -1)
        {
            game.show('right');
            game.right.push(letter);
        }
        else
        {
            game.show('wrong');
            game.wrong.push(letter);
        }

        setTimeout(function()
        {
            game.show('guess');
        }, 1000);
    },

    already: function()
    {
        game.show('already');

        setTimeout(function()
        {
            game.show('guess');
        }, 1000);
    },

    show: function(title)
    {
        $('.title div').addClass('hidden');
        $('.title .' + title).removeClass('hidden');
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
