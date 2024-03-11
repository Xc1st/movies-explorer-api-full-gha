const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  editUser, getMeUser,
} = require('../controllers/users');

router.get('/me', getMeUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }),
}), editUser);

module.exports = router;
