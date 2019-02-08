<?php
ini_set('display_errors', false);
date_default_timezone_set('UTC');

require "secret_tokens.php";
require_once('twitterexchange.php');

$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
$requestMethod = "GET";
$getfield = '?count=50&screen_name=realDonaldTrump&since_id='.$lastTweet;

$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)
                             ->buildOauth($url, $requestMethod)
                             ->performRequest();

require 'db_info.php';
$db_conn =  mysqli_connect($db_servername, $db_username, $db_password, $db_dbname);
if (!$db_conn) {
   die("Connection failed: " . mysqli_connect_error());
}
//SHOW TABLES LIKE 'yourtable';
$sql = "SHOW TABLES LIKE 'tweets'";
$result = mysqli_query($db_conn, $sql);
if(!$result->num_rows) {
  die('NO TABLE');
}



$last_fetch = $db_conn->query('SELECT * from "tweets" ORDER BY "date_created" "DESC" LIMIT 1');

if(!$last_fetch || $last_fetch->num_rows < 1) {
  die('Could not find latest');
}
$last_tweet = $last_fetch->fetch_assoc();
$last_tweet_id = $last_tweet['tweet_id'];

$settings = array(
    'oauth_access_token' => $twit_access_token,
    'oauth_access_token_secret' => $twit_access_token_secret,
    'consumer_key' => $twit_consumer_key,
    'consumer_secret' => $twit_consumer_secret
);

$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
$requestMethod = "GET";

$getfield = '?exclude_replies=true&include_rts=false&trim_user=true&count=50&screen_name=realDonaldTrump&since_id='.$lastTweet;

$twitter = new TwitterAPIExchange($credentials);
$response = $twitter->setGetfield($getfield)
                             ->buildOauth($url, $requestMethod)
                             ->performRequest();

$trump_tweets =  json_decode($response,true);
if(count($trump_tweets) === 0) {
  die('no new tweets');
}
$most_recent_tweet = $trump_tweets[0];
$most_recent_tweet_id = $most_recent_tweet['id_str'];

$trump_tweets = array_reverse($trump_tweets);
$tweeted = [];
foreach ($trump_tweets as $tt):
  $id = $tt['id_str'];
  //CHECK IF IT ALREADY EXISTS
  $id_check_fetch = $db_conn->query("SELECT * from 'tweets' WHERE `tweet_id` = '".$db_conn->real_escape_string($id)."'" );
  if(!$id_check_fetch) {
    continue;
  }
  if($id_check_fetch->num_rows > 0) {
    continue;
  }
  //INSERT ITEM`
  var $date_created = strtotime($tt["created_at"]);
  $insert_string = "INSERT INTO tweets 'tweet_id', 'created_at' VALUES '$id', '$date_created'";
  $insert_tweet = mysqli_query($db_conn, $insert_string);

  if(!$insert_tweet) {
    continue;
  }

  $tweet_exploded = explode(" ", $tweet);
  $tweet = $tt['text'];

  //CHECK IF GOOD
  if($tt['in_reply_to_user_id'] != NULL) {
    continue;
  }
  //NO @
  if(strpos($tweet_exploded[0], '"@') !== false) {
    continue;
  }
  //NO RT
  if( $tweet_exploded[0] == 'RT') {
    continue;
  }
  //CHECK FOR EXCLAMATION POINTS & CREATE STRING
  $exclaimed = false;
  $tweetString = "";
  foreach($tweet_exploded as $te):
    if(strpos($te,'!') !== false && strpos($te, 'http') == false) {
      $tweetString .= str_replace("!","?",$te).' ';
      $exclaimed = true;
    } else {
      $tweetString .= $te.' ';
    }
  endforeach;
  if(!$exclaimed) {
    continue;
  }
  $rip_string = str_replace("&amp;","&",$tweetString);
  $post_fields = array(
    "status" => $rip_string
  );

  $postedTweet = $twitter->buildOauth('https://api.twitter.com/1.1/statuses/update.json', 'POST')->setPostfields($postfields)->performRequest();
  if($postedTweet) {
    $tweeted.push($id);
  }

endforeach;

echo(implode("<br/> ",$tweeted));
die();


 ?>
