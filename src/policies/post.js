const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {

  new() {
    return true;
  }

  create() {
    return this.new();
  }

  edit() {
    return (this._isAdmin() || this._isOwner());
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}