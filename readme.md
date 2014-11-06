Stream & Parse Cloud
====================

This example helps you create activity streams & newsfeeds with Parse Cloud and [GetStream.io](https://getstream.io).

###Activity Streams & Newsfeeds

![](https://dvqg2dogggmn6.cloudfront.net/images/mood-home.png)

What you can build:

* Activity streams such as seen on Github
* A twitter style newsfeed
* A feed like instagram/ pinterest
* Facebook style newsfeeds
* A notification system

###Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Activity Streams & Newsfeeds](#activity-streams-&-newsfeeds)
- [Table of Contents](#table-of-contents)
- [Gem installation](#gem-installation)
- [Setup](#setup)
- [Model configuration](#model-configuration)
  - [Activity fields](#activity-fields)
  - [Activity extra data](#activity-extra-data)
- [Feed manager](#feed-manager)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### About Parse Cloud & GetStream.io

Parse Cloud allows you to write server side application logic and extend the functionality of your existing Parse installation. GetStream.io allows you to build scalable newsfeeds and activity streams. This example app shows how you can get them to work together.

The example app is based on Ember JS and showcases a Twitter/Facebook style community.

### Tutorial

#### Installing the Stream library

The Parse Cloud ecosystem is unique. You can find the adapted client for getstream.io in /cloud/getstream.js.
It allows you to talk to GetStream.io, the documentation for the client can be found here:

https://getstream.io/docs/

```
// initialize the getstream.io client
var stream = require('cloud/getstream.js');
var client = stream.connect(settings.streamApiKey, settings.streamApiSecret, settings.streamApp);
```

The easiest way to get started is probably to just copy over this entire repo.

#### Setting up the backend & syncing to getstream.io

To build your activity stream you need to notifity getstream.io of 2 things:

1.) When activities are added/removed
2.) When follow relationships are changed

If you haven't tried out getstream.io before I recommend you try the getting started first:
https://getstream.io/get_started/#intro
The interactive API tutorial will get you up to speed in a few minutes.

The code to notify GetStream.io of these events can be found in cloud/main.js
For each model defined in settings.activityModels we'll listen to the Parse.Cloud.afterSave and Parse.Cloud.afterDelete methods.

Furthermore we also listen to the changes in settings.followModel and sync the changes.

#### Creating activities

Now that our backend is correctly setup we can create activity's via Parse and they will get automatically send to getstream.io

```
// define your parse models
Activity = Parse.Object.extend("Activity");
Tweet = Activity.extend("Tweet");
var tweet = new Tweet();
tweet.set('actor', Parse.User.current());
tweet.set('verb', 'tweet');
tweet.set('tweet', 'Happy times');
tweet.save()
```

Now when you call tweet.save the Parse object get's stored. You can verify by visiting the parse data browser.
If you open your GetStream.io data browser you'll see the newly created feed containing the first activity.

#### Reading feeds

You can read feeds by using a Parse.Cloud.run('feed') call, for example:

```
var promise = Parse.Cloud.run('feed', {
	feed : 'user:all'
});
```

#### Getting the example app to run

If you want to install this example app on your own parse instance you'll need to update a few setting files

1.) cloud/settings.js
2.) config/global.json
3.) public/index.html (the inline config variable)






