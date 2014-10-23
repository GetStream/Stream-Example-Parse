stream = require('cloud/getstream.js');
client = stream.connect('hdhuew2dzq5k', 'enqn9tj4ktmpm777kwwtzwm7zk7qnsgm485p6ekt8twjv5ms7t98yvazs3szakqc', '738');

function parseToActivity(parseObject){
	var activity = {};
	var activityProperties = ["actor","verb", "object", "target", "tweet"];
	var arrayLength = activityProperties.length;
	for (var i = 0; i < arrayLength; i++) {
	    var field = activityProperties[i];
	    var value = parseObject.get(field);
	    if (value) {
	    	activity[field] = value;
	    } 
	}
	activity.foreign_id = parseObject.cid + ':' + parseObject.id;
	return activity;
};

Parse.Cloud.define("hello", function(request, response) {
	console.log('running helo, connecting');
	client = stream.connect('hdhuew2dzq5k', 'enqn9tj4ktmpm777kwwtzwm7zk7qnsgm485p6ekt8twjv5ms7t98yvazs3szakqc', '738');
	console.log('setting up feed');
	user1 = client.feed('user:1');
	console.log('adding activity');
	activity = {
		'actor' : 1,
		'verb' : 'tweet',
		'object' : 1,
		'target' : 1,
		'tweet': 'hi from parse cloud'
	};
	user1.addActivity(activity);

	response.success("Hello world!");
});

Parse.Cloud.afterSave("Tweet", function(request, response) {
	// trigger fanout
	var parseObject = request.object;
	var activity = parseToActivity(parseObject);
	user1 = client.feed('user:1');
	user1.addActivity(activity);
});

Parse.Cloud.afterSave("Picture", function(request, response) {
	// trigger fanout
	var parseObject = request.object;
	var activity = parseToActivity(parseObject);
	user1 = client.feed('user:1');
	user1.addActivity(activity);
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

