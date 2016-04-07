define(function()
{
    function randomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return randomInt;
});
