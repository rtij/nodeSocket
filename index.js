const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const cors = require('cors');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

server.use(cors());

app.get('/', (req, res) => {
  res.json({
    data: 'Hello World'
  });
});

app.get('/:name', (req, res) => {
  let name = req.params.name;

  res.json({
    data: `Hello ${name}`
  });
});



// socket handler
const io = socketIO(server);

io.origins('*:*');


io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

io.socket.on("message", function (data) {
  // When a "message" event is received, emit another "message" event with the same data
  io.emit("message", data);
});