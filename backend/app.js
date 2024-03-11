require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const handleError = require('./middlewares/handle-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter, DB_ADDRESS } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(handleError);
app.listen(PORT);
