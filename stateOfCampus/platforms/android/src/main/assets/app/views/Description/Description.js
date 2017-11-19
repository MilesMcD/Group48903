var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

function moveToReport() {
    topmost.navigate("views/Report/Report");
};

exports.moveToReport = function() {
    moveToReport();
};
exports.back = function() {
    topmost.goBack();
};