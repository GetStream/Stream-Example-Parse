
stream = require('cloud/getstream.js');


Parse.Cloud.define("hello", function(request, response) {
  console.log('running helo, connecting');
  client = stream.connect('hdhuew2dzq5k', 'enqn9tj4ktmpm777kwwtzwm7zk7qnsgm485p6ekt8twjv5ms7t98yvazs3szakqc', '738');
  console.log('setting up feed');
  user1 = client.feed('user:1');
  console.log('adding activity');
  activity = {'actor': 1, 'verb': 'pin', 'object': 1, 'target': 1};
  user1.addActivity(activity, function() {
  	console.log('callback', arguments);
  });
  response.success("Hello world!");
});

Parse.Cloud.afterSave("Tweet", function(request, response) {
  // trigger fanout
  console.log("Tweet Saved");
});

Parse.Cloud.afterSave("Picture", function(request, response) {
  // trigger fanout
  console.log("Picture Saved");
});

Parse.Cloud.afterDelete("Tweet", function(request) {
  // trigger fanout to remove
});

Parse.Cloud.afterDelete("Picture", function(request) {
  // trigger fanout to remove
});


Parse.Cloud.afterSave("Follow", function(request, response) {
  // set the follow
});

Parse.Cloud.afterDelete("Follow", function(request) {
  // remove the follow
});

