var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

function moveToDescription {
    topmost.navigate("views/Description/Description");
};

exports.register = function() {
    moveToDescription();
};
exports.back = function() {
   topmost.goBack();
};