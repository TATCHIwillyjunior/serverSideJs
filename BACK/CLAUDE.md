There is a problem in my code or my logic isn't up to task

<!-- I got this because the post request I use as test cause program to crash out which is not really professional and shoud either throw an error corresponding to it status code
post request :{
    "id": m,
    "name": "David Moreau",
    "email": "david.moreau@epita.fr",
    "password": "david123",
    "major": "Computer Science",
    "gpa": 3.7
}
crash :(<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>SyntaxError: Unexpected token &#39;m&#39;, ...&quot; &nbsp; &nbsp;&quot;id&quot;: m,<br> &nbsp; &nbsp;&quot;na&quot;... is not valid JSON<br> &nbsp; &nbsp;at JSON.parse (&lt;anonymous&gt;)<br> &nbsp; &nbsp;at parse (C:\Users\willy\Documents\Epita Bachelore in Computer Science\S4\ServerJs\BACK\node_modules\body-parser\lib\types\json.js: 72: 19)<br> &nbsp; &nbsp;at C:\Users\willy\Documents\Epita Bachelore in Computer Science\S4\ServerJs\BACK\node_modules\body-parser\lib\read.js: 162: 18<br> &nbsp; &nbsp;at AsyncResource.runInAsyncScope (node:async_hooks: 206: 9)<br> &nbsp; &nbsp;at invokeCallback (C:\Users\willy\Documents\Epita Bachelore in Computer Science\S4\ServerJs\BACK\node_modules\raw-body\index.js: 238: 16)<br> &nbsp; &nbsp;at done (C:\Users\willy\Documents\Epita Bachelore in Computer Science\S4\ServerJs\BACK\node_modules\raw-body\index.js: 227: 7)<br> &nbsp; &nbsp;at IncomingMessage.onEnd (C:\Users\willy\Documents\Epita Bachelore in Computer Science\S4\ServerJs\BACK\node_modules\raw-body\index.js: 287: 7)<br> &nbsp; &nbsp;at IncomingMessage.emit (node:events: 524: 28)<br> &nbsp; &nbsp;at endReadableNT (node:internal/streams/readable: 1698: 12)<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues: 82: 21)</pre>
</body>
</html>
) -->

thiis time error handling works but I fill like the middlware has failed to answer this part as if what has been imput throught post request should be handle by the middle not move up to the index file to handle the error 
post request: {
    "id": 5,
    "name": "David Moreau",
    "email": "david.moreau@epita.fr",
    "password": "david123",
    "major": "Computer Science",
    "gpa": ,, // This should be a number, not a string.
}

what I get (I will keep it):
{
    "error": "❌ Invalid JSON in request body."
}
