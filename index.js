const rcloadenv = require('@google-cloud/rcloadenv');
const twitter = require('twitter');
const dotenv = require('dotenv');

process.on('unhandledRejection', console.dir);

dotenv.config();

const USER_TIMELINE_URL = 'statuses/user_timeline';
const TARGET_SCREEN_NAME = 'siquare';
const TWEETS_COUNT = 10;

async function getTweets(client) {
  const params = { screen_name: TARGET_SCREEN_NAME, count: TWEETS_COUNT };
  const tweets = await client.get(USER_TIMELINE_URL, params);

  return tweets;
}

async function getTwitterConfig() {
  if (process.env.NODE_ENV === 'development') {
    return {
      CONSUMER_KEY:        process.env.TWITTER_CONSUMER_KEY,
      CONSUMER_SECRET:     process.env.TWITTER_CONSUMER_SECRET,
      ACCESS_TOKEN:        process.env.TWITTER_ACCESS_TOKEN,
      ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    };
  } else {
    return await rcloadenv.getAndApply('twitter', );
  }
}

exports.helloGET = async (req, res) => {
  const twitterConfig = getTwitterConfig();
  const client = new twitter({
    consumer_key:        twitterConfig.CONSUMER_KEY,
    consumer_secret:     twitterConfig.CONSUMER_SECRET,
    access_token_key:    twitterConfig.ACCESS_TOKEN,
    access_token_secret: twitterConfig.ACCESS_TOKEN_SECRET,
  });

  const tweets = getTweets(client);

  res.send(tweets[0].text);
};

async function main() {
  const twitterConfig = await getTwitterConfig();
  const client = new twitter({
    consumer_key:        twitterConfig.CONSUMER_KEY,
    consumer_secret:     twitterConfig.CONSUMER_SECRET,
    access_token_key:    twitterConfig.ACCESS_TOKEN,
    access_token_secret: twitterConfig.ACCESS_TOKEN_SECRET,
  });

  console.log(twitterConfig);

  const tweets = await getTweets(client);

  console.log(tweets);
}

main();
