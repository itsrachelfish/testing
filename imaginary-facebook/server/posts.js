var friends = require('./friends');
var helper = require('./helper');

// Functions for generating random posts
var posts =
{
    // List of created posts
    list: [],

    // Generate three random posts to start
    init: function()
    {
        var hour = 1000 * 60 * 60;
        posts.update(friends.list[helper.random(0, friends.list.length - 1)], new Date().getTime() - helper.random(hour * 6, hour * 12));
        posts.update(friends.list[helper.random(0, friends.list.length - 1)], new Date().getTime() - helper.random(hour * 3, hour * 6));
        posts.update(friends.list[helper.random(0, friends.list.length - 1)], new Date().getTime() - helper.random(hour * 0, hour * 3));
    },

    // Randomly create a post
    update: function(friend, date)
    {
        // Don't do anything if we've run out of sample data
        if(!posts.sample.length) return;
        
        // If no friend is specified, select one from the list of online friends
        if(!friend)
        {
            // Don't update if nobody is online
            var online = friends.online();
            if(!online.length) return;
            
            var randomFriend = helper.random(0, online.length - 1);
            friend = online[randomFriend];
        }

        // If no date is specified, use the current time
        if(!date)
        {
            date = new Date().getTime();
        }

        // Generate random post
        var randomPost = helper.random(0, posts.sample.length - 1)
        var post = posts.sample[randomPost];
        post.friend = {name: friend.name, avatar: friend.avatar};
        post.date = date;

        // Remove from sample data
        posts.sample.splice(randomPost, 1);

        // Add to list of posts
        posts.list.unshift(post);
    },

    // List of possible sample data that can be posted
    sample:
    [
        {text: "90s operating system nostalgia", image: 'post-1.png'},
        {text: "HAHAHAHA I LOVE COMMUNITY", image: 'post-2.gif'},
        {text: "I went to the doctor\n\nit went something like this:", image: 'post-3.gif'},
        {text: "LOOK AT THAT LION\nI MEAN TIGER\n\nI MEAN... WHATEVER!!", image: 'post-4.jpg'},
        {text: "W̩͈I͚̗̖ͅN̜̲N̛̼̼̥E̴̥̟͎̥͚Y̠̠͇͖͍\n͏N͙͚̪O ͏͎D̼̘͎͓̖̣͇O͔̥̗͓̻N̤̰̥͘'̜T̠̖͎̲̠\n̡͉̬̘͕̳̦̭D͈̤̹̥͎̣̩O̭͜N'̥̺͚͍͙͍͉̰͞T̨ ̥͍͜D҉̠̤͇̫̺O͖̝͉̺ ̶̖̲̮͉̹̹̼I͔̣T̮̕", image: 'post-5.jpg'},
        {text: "thank mr skeletal", image: 'post-6.jpg'},
        {text: "so scarred rn", image: 'post-7.gif'},
        {text: "If I did this in minecraft, I'd feel like I fucked up real bad.", image: 'post-8.gif'},
        {text: "In a world of technology and wonder, filled with iPhone applications, one application surpasses them all! This Spring, create your own unforgettable audio experience. Countless options, Full Throttle Action, and You! The Action Movie Trailer Generator.\n\nhttps://wiki.wetfish.net/Mike-Schwabe"},
        {text: "Stephercise or Stephercising is an intense athletic experience"},
        {text: "In 70 years, Tim will return from the dead to slay all the stupid humans. By the time he's finished, the entire Earth will have disappeared. There will be no way for us to stop him, and all the guns will be gone. Unless you ask him if there won't be guns. In this case, the guns will simply have no effect. Regardless of these inconsistencies, the universe will have to be restarted from scratch."},
        {text: "Super Heart was La Forged deep in the bowels of Atomic's chest, after a freak accident and the consumption of a whole bottle of red wine every night. Super Heart seeks out evil doers and using his ability to buy cheap red wine drinks them under the table.\n\nThere are a lot of questions around Super Heart's sexual preference.\n\nDuring the day Super Heart resumes his alter ego as Atomic Firedoll's normal heart, where he is a covert anti-terrorist private military member, on a secret mission to protect The Queen of Space. To do this, he assumes the guise of a student at her high school. Having never experienced social interactions, and always interpreting everyday situations from a combat perspective, Super Heart is found as a military fanboy by his schoolmates. He comes to relate with The Queen of Space, who realizes that Super Heart is protecting her. But, Heart refuses to reveal his reasons, as he is under orders and needs to keep The Queen from becoming a target."},
        {text: "Do you wanna be cool? Have people look up to you, listening to your magical musical masterpieces?\nNo longer does it just have to be a dream, Wetfish Radio is here!\n\nhttps://wiki.wetfish.net/radio"},
        {text: "Kalanchoe daigremontiana also called Mother of Thousands, Alligator Plant, or Mexican Hat Plant is a succulent plant native to Madagascar. This plant is distinguished by its ability to propagate via vegetative propagation. All parts of the plant are poisonous, which can even be fatal if ingested by infants or small pets."},
        {text: "October is a month after September but before November. Notable events include Sober October"},
        {text: "Adrian et al. estimate that, for a single 1024-bit prime, doing the NFS precomputation would take about 45 million years using a single core—or to put it more ominously, 1 year using 45 million cores. If you built special-purpose hardware, that could go down by almost two orders of magnitude, putting the monetary cost at a few hundred million dollars, completely within the reach of a sufficiently determined nation-state. Once the precomputation was done, and the terabytes of output stored in a data center somewhere, computing a particular discrete log would then take about 30 days using 1 core, or mere minutes using a supercomputer."},
        {text: "Why did Geotrust just go ahead and revoke the certificates for all .PW domains without any warning? Why did they believe that this was the best course of action and why did they decide to put domains at risk? It is because of these questions that I cannot recommend using them as a certificate authority.\n\nGeotrust has done a great job demonstrating the problem with certificate authorities: they're closed organizations that you cannot put any trust into."},
        {text: "Did you know that you can polarize light into a vortext?\n\n'This work is a great example of how supposedly well-studied physical systems can contain rich and undiscovered phenomena, which can be unearthed if you dig in the right spot'\n\nhttp://phys.org/news/2014-12-halting-photons-miniature-particle-transmission.html"},
    ]
}

module.exports = posts;
