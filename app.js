const express   = require("express"),
    app         = express(), 
    bodyParser  = require("body-parser"), 
    mongoose    = require("mongoose")
    Campground = require("./models/campground");
    
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/campground", { useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds : campgrounds});
        }
    })
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
})

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

app.get("/campgrounds/:id", (req, res) => {
    var pickedId = req.params.id;
    Campground.findById(pickedId, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: campground});
        }
    }
)})

app.listen(3000, () => {
    console.log("server has started");
});