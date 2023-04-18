// Load env variables
import './utils/loadEnv.js';
import { connectDB } from './utils/db.js';
connectDB();

// Express Setup
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Socket.io Setup
import http from 'http';
import { Server } from 'socket.io';
const server = http.Server(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// BodyParser
const urlencodedParser = express.urlencoded({ extended: true });
app.use(urlencodedParser);
app.use(express.json());

// Routes
import routes from "./routes/index.js";

// HBS Setup
import { engine } from 'express-handlebars';

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
}));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')))


io.on('connection', socket => {
    socket.on('join-chat', (name) => {
        socket.join(name);
    })

    socket.on('new-msg-sent', chat => {
        socket.to(chat.name).emit('new-msg', chat.msg);
    })
})

// Use Routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});