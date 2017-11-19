var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");

function Report() {
    user.register()
        .then(function() {
            dialogsModule
                .alert("Your report was successfully submitted.")
                .then(function() {
                    frameModule.topmost().navigate("views/Description/Description");
                });
        }).catch(function(error) {
            console.log(error);
            dialogsModule
                .alert({
                    message: "Sorry, we were unable to gain your report.",
                    okButtonText: "OK"
                });
        });
}

exports.report = function() {
    Report();
};