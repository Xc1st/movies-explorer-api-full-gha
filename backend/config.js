const { DB_ADDRESS } = process.env;

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const requiredField = 'Поле должно быть заполнено';
const filmUrl = 'Введите URL';
const correctEmail = 'Введите верный email';
const wrongEmailOrPassword = 'Неправильные почта или пароль';
const minlength = 'Минимальная длина поля - 2';
const maxlength = 'Минимальная длина поля - 30';
const wrongId = 'неправильный _id';
const unknownCardId = 'Карточка с данным _id не найдена.';
const anotherUserCard = 'Карточка другого пользователя';
const deletedCard = 'Карточка удалена';
const alreadyInUse = (email) => `Пользователь с email:${email} уже зарегистрирован`;
const unknownUserId = 'Пользователь по указанному _id не найден.';
const authorizationNeeded = 'Необходима авторизация';
const serverError = 'На сервере произошла ошибка';
const notFoundPage = 'страница не найдена.';

module.exports = {
  urlRegex,
  limiter,
  DB_ADDRESS,
  requiredField,
  filmUrl,
  correctEmail,
  wrongEmailOrPassword,
  minlength,
  maxlength,
  wrongId,
  unknownCardId,
  anotherUserCard,
  deletedCard,
  alreadyInUse,
  unknownUserId,
  authorizationNeeded,
  serverError,
  notFoundPage,
};
