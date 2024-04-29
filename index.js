const express = require("express");
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

const PORT = 3000;
const app = express();
const DB = 'mongodb+srv://dhairyaupadhyaya2:danny1234@cluster0.pii4zkg.mongodb.net/';

app.use(express.json());
app.use(authRouter);

mongoose.connect(DB).then(() => {
    console.log('Connection Successful !');
}).catch(e => {
    console.log(e);
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Started At ${ PORT }`)
});