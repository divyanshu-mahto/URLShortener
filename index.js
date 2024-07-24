const express = require("express");
const connectMongoDB = require('./connect');

const urlRouter = require('./routes/url');

const app = express();
const PORT = 8001;

app.use(express.json());

connectMongoDB("mongodb://localhost:27017/shortURL")
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Can't connect to Database ",err))

app.use('/url', urlRouter);

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));