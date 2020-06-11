const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.post('/spin', (req, res) => {
    io.emit('spin', true);
    res.send('success')
});

http.listen(process.env.PORT || 4100, () => console.log('I am listening on port ' + process.env.PORT));
