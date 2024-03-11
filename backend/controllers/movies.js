const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');
const {
  anotherUserCard, deletedCard, wrongId, unknownCardId,
} = require('../config');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(anotherUserCard);
      }
      Movie.deleteOne(card)
        .then(() => {
          res.status(HTTP_STATUS_OK).send({ message: deletedCard });
        });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new BadRequestError(wrongId));
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(unknownCardId));
      } else {
        next(error);
      }
    });
};
