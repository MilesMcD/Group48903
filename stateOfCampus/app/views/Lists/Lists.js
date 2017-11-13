var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

function moveToDescription {
    var topmost = frameModule.topmost();
    topmost.navigate("views/Description/Description");
};
}

exports.register = function() {
    moveToDescription();
};
exports.back = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("main-page");
};