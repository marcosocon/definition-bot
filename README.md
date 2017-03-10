# definition-bot

A simple api for a slack-bot

## Running Locally

```sh
node index.js
```
Your app should now be running on [localhost:5000](http://localhost:5000/).

Now, you can make a post request to the server with a text param.

EX:
```sh
body = { text: 'SomeFancyWord'}
```

or you can execute via slack with:

```sh
/dictio SomeFancyWord
```

That's it!