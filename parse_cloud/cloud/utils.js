

exports.parseToActivity = function parseToActivity(parseObject) {
    var activity = {};
    var activityProperties = ["actor", "verb", "object", "target", "tweet"];
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

