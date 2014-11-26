GetStream.io, Parse cloud code & EmberJS
========================================

This example app helps you create activity streams & newsfeeds with [Parse Cloud Code](https://parse.com/docs/cloud_code_guide) and [GetStream.io](https://getstream.io).

###Activity Streams & Newsfeeds

![](https://dvqg2dogggmn6.cloudfront.net/images/mood-home.png)

What you can build:

* Activity streams such as seen on Github
* A twitter style newsfeed
* A feed like instagram/ pinterest
* Facebook style newsfeeds
* A notification system

### Demo

You should start by checking out [the demo](https://getstream.parseapp.com/) hosted on Parse.

### About Parse Cloud & GetStream.io

Parse Cloud allows you to write server side application logic and extend the functionality of your existing Parse installation. GetStream.io allows you to build scalable newsfeeds and activity streams. This example app shows how you can get them to work together.

The example app is based on [EmberJS](http://emberjs.com/) and showcases a Twitter/Facebook style community.

### Tutorial

#### Installing the Stream library
The Parse cloud compatible client can be found in  [cloud/getstream.js](https://github.com/tschellenbach/Stream-Example-Parse/blob/master/cloud/getstream.js).
The documentation for the client can be found on [getstream.io/docs](https://getstream.io/docs/)
If you haven't tried out getstream.io before I recommend the [getting started](https://getstream.io/get_started/#intro).
The interactive API tutorial will get you up to speed in a few minutes.

#### Syncing activities to getstream.io

To build your activity stream you need to notifity getstream.io of 2 things:

1. When activities are added/removed
2. When follow relationships change

The code to notify GetStream.io of these events can be found in [cloud/main.js](https://github.com/tschellenbach/Stream-Example-Parse/blob/master/cloud/main.js)
For each model defined in settings.activityModels we'll listen to the Parse.Cloud.afterSave and Parse.Cloud.afterDelete methods.

Furthermore we also listen to the changes in settings.followModel and sync the changes.

#### Creating activities

Now that our Parse Cloud code is correctly setup, activities created via Parse will get published to getstream.io

```
// create a new tweet
var tweet = new Tweet();
// we write to the user feed
tweet.set('feedSlug', 'user');
tweet.set('feedUserId', user.id);
// the tweet's data
tweet.set('actor', user);
tweet.set('verb', 'tweet');
tweet.set('tweet', 'hello world');
tweet.set('likes', 0);
tweet.save();
```

When you call tweet.save() the Parse object is created. After the tweet is created the Parse.Cloud.afterSave trigger will publish the activity to getstream.io.

#### Reading feeds

You can read feeds by using a Parse.Cloud.run('feed') call, for example:

```
var promise = Parse.Cloud.run('feed', {
	feed : 'user:1'
});
```

Will retrieve the user feed for user 1.

### Advanced: Running this example app

#### Settings

If you want to install this example app on your own parse instance you'll need to update a few setting files

0. signup for parse, getstream.io and create a github app (for the github login)
1. edit cloud/settings.js
2. edit config/global.json
3. edit public/index.html (the inline config variable)

#### Dev tools

0. install gulp, compass and bower
1. bower install
2. gulp
3. parse develop <your application name>

gulp will monitor for changes and livereload the index.html file
parse develop will upload your cloud code and host it at <yourconfiguredvalue>.parseapp.com.





