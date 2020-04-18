const express   = require("express"),
    app         = express(), 
    bodyParser  = require("body-parser"), 
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

    
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/campground", { useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));

seedDB();

app.get("/", (req, res) => {
    res.render("campgrounds/home");
});

//Index Route
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    })
})

//New Route
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
})

//Create Route
app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    Campground.create(
        {
            name: name,
            image: image,
            description: description
        }, 
        (err, campground) => {
            if(err) {
                console.log(err);
            } else {
                console.log("added");
            }
        }
    )
    res.redirect("/campgrounds");
})

//Show Route
app.get("/campgrounds/:id", (req, res) => {
    var pickedId = req.params.id;
    Campground.findById(pickedId).populate("comments").exec((err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: campground});
        }
    })
})



//COMMENTS ROUTES

//New (comment) Route
app.get("/campgrounds/:id/comments/new", (req, res) => {
    var pickedId = req.params.id;
    Campground.findById(pickedId, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground : campground});
        }
    })
})

//Create (comment) Route
app.post("/campgrounds/:id/comments", (req, res) => {
    var pickedId = req.params.id;
    Campground.findById(pickedId, (err, campground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment,
                (err, comment) => {
                    if(err) {
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect("/campgrounds/" + pickedId);
                    }
                }
            )
        }
    })
})

app.listen(3000, () => {
    console.log("server has started");
});