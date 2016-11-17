// Misc helper functions
var helper =
{
    random: function(min, max)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

module.exports = helper;
