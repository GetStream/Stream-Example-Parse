
function serializeId(parseObject) {
	return 'ref:' + parseObject.cid + ':' + parseObject.id;
};
exports.serializeId = serializeId;


exports.parseToActivity = function parseToActivity(parseObject) {
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
    activity.foreign_id = serializeId(parseObject);
    return activity;
};

