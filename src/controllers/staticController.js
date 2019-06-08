module.exports = {
    index(req, res, next) {
        res.render("static/index", { title: "Welcome to Bloccit" });
    },
    about(req, res, next) {
        res.render("static/about", { title: "About Bloccit" });
    },
    math(req, res, next){
        res.render("static/about", { title: "About Bloccit" });
        console.log(7 + 10);
        return 7+10;
    }
}