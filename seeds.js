const mongoose = require("mongoose"),
    Campground = require("./models/campground");
    Comment = require("./models/comment");

var data = [
    {
        name: "Sample Campground 1",
        image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Easy-going nothing too complicated extrovert whiskey. Working at a coffee shop parallel parking sushi I'm looking for my cats, The Daily Show I'm really good at new friends Netflix thinking about trying yoga. Introvert my goofy smile having a few beers parallel parking passionate about food."
    },
    {
        name: "Example Spot 2",
        image: "https://images.unsplash.com/photo-1527931548997-178c464df936?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "My eyes listening to music sushi everything but country music. Listening to music is pretty awesome exploring the city vegetarian bacon, trying this for the first time trying different restaurants the simple things in life strong and confident whiskey. Indian food watching a movie adventures degree in philosophy shoot me a message honest and direct."
    },
    {
        name: "Here is the tent spot 3",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Making people laugh ethical nonmonogamy art school really hoppy beers. As friends discussing politics sleeping late food Indian food, The Daily Show is pretty awesome grab coffee or a drink the simple things in life adventures. Sleeping late I value art not looking for a penpal Ethiopian you should message me whiskey."
    }
]

function seedDB() {
    //Removes all campgrounds from the database
    Campground.remove({}, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            //Adds some campgrounds to the DB
            data.forEach(seed => {
                Campground.create(seed, (err, campground) => {
                    if(err) {
                        console.log(err);
                    } else {
                        //Adds a comment on each post
                        Comment.create(
                            {
                                text: "this place is great but I wish it had internet",
                                author: "joe biden"
                            }, (err, comment) => {
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("comment added");
                                }
                            }
                        );
                    }
                })

            });
        };
    });



}

module.exports = seedDB;
