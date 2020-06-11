const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('Hello! Welcome to the page.')
});

io.on('connection', (socket) => {
    console.log('A user connected');
});

app.post('/spin', (req, res) => {
    io.emit('spin', true);
    res.send('success')
});


http.listen(process.env.PORT || 4100, () => console.log('I am listening on port ' + process.env.PORT));
