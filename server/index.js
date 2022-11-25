const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const roomRouter = require('./router/roomRouter');
const authRouter = require('./router/authRouter');
const errorMiddleware = require('./exeptions/api-error');

const app = express();

const server = require('http').Server(app);


const io = require('socket.io')(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});
io.setMaxListeners(0)



const PORT = process.env.PORT || 5000;

require('dotenv').config()

app.set("view engine", "ejs");

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.static("public"));
app.use(express.json());

//mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=20000&appName=mongosh+1.6.0


const start = async () => {
    try {
        await mongoose
            .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((res) => console.log('Connected to DB'))
            .catch((error) => console.log(error))

        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}



io.on('connection', (socket) => {
    
    console.log(`Успешное соединение`, socket.id)
    ioConnections.push(socket);
    socket.on('message', (data) => {
            console.log(data)
    });
    socket.on('disconnect', function(data) { 
        ioConnections.splice(ioConnections.indexOf(socket), 1);
        console.log('Успешное отключение')
    });
});

start();

app.use('/auth', authRouter);

app.use('/room', roomRouter);
//sWnE1Yne5yXA-f-9AAAA
//63762f602e7ecd14e5c2710d

app.use(errorMiddleware);


ioConnections = [];




