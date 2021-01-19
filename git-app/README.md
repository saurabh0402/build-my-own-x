# Giffy 🎉
## What is Giffy? 🤔
A simple Git App that comments with a gif when invoked. To invoke simple write `[giffy:keyword]` in the comment and in a few seconds the bot will respond with a gif for the given `keyword`.

![WOOOOOOOW](https://media.giphy.com/media/26ufdipQqU2lhNA4g/source.gif)

## GitHub Apps? What? ❓
**GitHub Apps** are applications that people can install on one or more repository. When installed, an `installation id` is assigned which is later used internally by the app. These apps then start receiving events that they have subscribed to (like - the app receives a hit when a comment is created, etc). On receiving these events the app can then take some action. One thing that the app can do is to perform action on the GitHub repositories that they are installed on. For this it uses the `installation id` to get a token for using GitHub APIs and using thr APIs it can take any action required.

## Setting things up 🔩
### Deploying the service 🚀
This uses `serverless` to deploy the single endpoint on an AWS Lambda. Simply run the following commands after moving into this directory and copy the URL generated after success.
```
  yarn install
  npx sls deploy
```

### Setting up GitHub Apps 🚀
- Go to your account > settings > developer setting > GitHub apps.
- Create a new GitHub app. Fill in required data - name, webhook URL, etc.
- Remember to take `Repository` and `Issues` permission and subscribe to events related to them.
- Once the app is created, download the Private key for the app in your code folder and rename it to `pkey.pem`.
- Redeploy the service.
- Install the app in any repository you want to use it in and hopefully (🤞 ) everything should work.

## Credits 🏆
***All credits to [https://blog.scottlogic.com/2017/05/22/gifbot-github-integration.html](https://blog.scottlogic.com/2017/05/22/gifbot-github-integration.html).***
