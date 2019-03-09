const bcrypt = require("bcryptjs");

module.exports = {

  ensureAuthenticated(req, res, next) {
    if (!req.user){
      console.log("No, you are not authenticated")
      req.flash("notice", "You must be signed in to do that.")
      return res.redirect("/users/sign_in");
    } else {
      console.log("Yes, you are authenticated")
      next();
    }
  },

  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
}