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
];

var game =
{
    state: 'waiting', // Possible states: waiting, playing, win, lose
    right: [],
    wrong: [],

    play: function()
    {
        game.state = 'playing';

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

        alert('you guessed ' + letter);
    },

    already: function()
    {
        $('.title .guess').addClass('hidden');
        $('.title .already').removeClass('hidden');

        setTimeout(function()
        {
            $('.title .guess').removeClass('hidden');
            $('.title .already').addClass('hidden');
        }, 1000);
    },
};

$(document).ready(function()
{
    $('.play button').on('click', function()
    {
        $('.title .play').addClass('hidden');
        $('.title .guess').removeClass('hidden');

        game.play();
    });

    $('.guess input').on('input', function()
    {
        game.guess($(this).value());
        $(this).value('');
    });
});
