const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');




const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use(bodyParser.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use('/images', express.static(path.join(__dirname, 'images')));




const staffRoutes = require('./routes/staffRoutes');


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




app.use('/staff', staffRoutes);



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});





(async() => {
    try {
        await mongoose.connect('mongodb+srv://mo:test@cluster0-xczct.mongodb.net/staff-db?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        http.listen(process.env.PORT || 4100, () => console.log('I am listening on port ' + process.env.PORT))
    } catch (e) {
        console.log(err);
    }
})();