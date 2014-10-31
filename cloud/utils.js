var _ = require('underscore');

function serializeId(parseObject) {
	/*
	 * Returns ref:className:id
	 */
	return 'ref:' + parseObject.className + ':' + parseObject.id;
};
exports.serializeId = serializeId;

function normalizeModelClass(className) {
	var modelClass = className;
	var map = {'_User': Parse.User};
	if (className in map) {
		modelClass = map[className];
	}
	return modelClass;
};
exports.normalizeModelClass = normalizeModelClass;

exports.parseToActivity = function parseToActivity(parseObject) {
	console.log('parse to activity');
	var activity = {};
	var activityProperties = ["actor", "verb", "object", "target", "to", "time"];
	var arrayLength = activityProperties.length;
	for (var i = 0; i < arrayLength; i++) {
		var field = activityProperties[i];
		var value = parseObject.get(field);
		if (value) {
			activity[field] = value;
		}
	}
	activity.actor = serializeId(parseObject.get('actor'));
	console.log('actor');
	console.log(activity.actor);
	activity.object = serializeId(parseObject);
	activity.foreign_id = serializeId(parseObject);
	return activity;
};

function enrich(activities) {
	/*
	 * TODO:
	 *
	 * Figure out how to get a model instance' name
	 *
	 */
	// Find all the references and add them to the lookup object
	console.log(Parse.Collection.models);
	var lookup = {};
	_.each(activities, function(activity) {
		_.each(activity, function(value, field) {
			if (value && value.indexOf('ref') === 0) {
				var parts = value.split(':');
				if (!(parts[1] in lookup)) {
					lookup[parts[1]] = [];
				}
				lookup[parts[1]].push(parts[2]);
			}
		});
	});

	// Query all the needed data in parallel and wait for results
	var promises = [];
	_.each(lookup, function(ids, className) {
		var query = new Parse.Query(normalizeModelClass(className));
		query.containedIn("objectId", ids);
		var promise = query.find();
		promises.push(promise);
	});
	var all = Parse.Promise.when(promises);
	
	// Transform the queries into dictionaries
	// And add the data to the response
	var promise = all.then(function() {
		var resultSets = _.toArray(arguments);
		var resultHash = {};
		_.each(resultSets, function(results) {
			if (results.length) {
				resultHash[results[0].className] = {};
				_.each(results, function(result) {
					resultHash[result.className][result.id] = result;
				});
			}
		});

		// now we set the data
		_.each(activities, function(activity) {
			_.each(activity, function(value, field) {
				if (value && value.indexOf('ref') === 0) {
					var parts = value.split(':');
					var parseModels = resultHash[parts[1]];
					activity[field + '_parse'] = parseModels && parseModels[parts[2]];
				}
			});
		});
		return activities;
	}, function() {
		console.log('failed to query the data needed for enrichment');
	});

	return promise;
}

exports.enrich = enrich;
