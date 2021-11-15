
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const cors = require('cors');

const PORT = 4000;
const DB   = 'mongodb://localhost/notasapp';

mongoose.connect(DB).then(() => console.log('DB conectada'));

const app = express();
app.use(cors());
// para que aparezca algo en req.body
app.use(express.json());

app.use('/', require('./api/note'));

=======
const cors = require('cors')

const PORT = 4000;
const DB = 'mongodb://localhost/notasapp';

mongoose.connect(DB).then(() => console.log("DB conectada"));

const app = express();
app.use(cors());
app.use(express.json()); // para el req.body

app.use('/', require('./api/note'));

// const User = require('./models/User.js');
//
// app.get('/api/users', (req, res) => {
//   User.find((err,users) => {
//     res.json(users);
//   });
// });

>>>>>>> 1ab25e796467e6ceb4bc17822c050a3e6f28b72b
app.use(express.static('public'));

app.listen(PORT);
