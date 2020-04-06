const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

var list = [
    {name: "Salmon Creek",
    image: "https://pixabay.com/get/52e9d5434b5aa414f1dc8460cf2934771438dbf85254794f74277cd69f4c_340.jpg"
    },
    {name: "Biscuit Hill",
    image: "https://pixabay.com/get/54e5d4414356a814f1dc8460cf2934771438dbf85254794f74277cd69f4c_340.jpg"
    },
    {name: "Golden Waterfall",
    image: "https://pixabay.com/get/57e8d7444251ae14f1dc8460cf2934771438dbf85254794f74277cd69f4c_340.jpg"
    },

    {name: "Salmon Creek",
    image: "https://pixabay.com/get/52e9d5434b5aa414f1dc8460cf2934771438dbf85254794f74277cd69f4c_340.jpg"
    },
    {name: "Biscuit Hill",
    image: "https://pixabay.com/get/57e8d7444251ae14f1dc8460cf2934771438dbf85254794f74277cd69f4c_340.jpg"
    },
    {name: "Golden Waterfall",
    image: "https://pixabay.com/get/54e5d4414356a814f1dc8460cf2934771438dbf85254794f74277cd69f4c_340.jpg"
    }
]

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {list : list})
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
})

app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newObj = {name: name, image: image};
    list.push(newObj);
    console.log(newObj);
    res.redirect("/campgrounds");
})

app.listen(3000, () => {
    console.log("server has started");
});