var clear = function() {
  var min = new Date(new Date() - DURATION);
  Documents.remove({
    createdAt: {$lt: min}
  });
};


Meteor.startup(function() {
  clear();
  Meteor.setInterval(clear, INTERVAL);
});
//This code will allow us to clear old entries on an interval.
//https://stackoverflow.com/questions/26247234/removing-mongo-entry-after-a-specific-set-of-time-in-a-meteor-application