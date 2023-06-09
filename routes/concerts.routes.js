const express = require('express');
const router = express.Router();
const uuid = require('uuid').v4;
db = require('../db.js');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random() * (db.concerts.length))]);
});

router.route('/concerts/:id').get((req, res) => {
  const concert = db.concerts.find(concert => concert.id === parseInt(req.params.id));
  
  if (!concert) {
    res.status(404).send('404 Not found...');
  } else {
    res.json(concert);
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuid();
  const newConcert = {
    id: id,
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  };

  db.concerts.push(newConcert);

  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = +req.params.id;
  const concert = db.concerts.find((concert) => concert.id === id)
  
  if (!concert) {
    res.status(404).send('404 Not found...');
  } else {
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;

    res.json({ message: 'OK' });
  };
});

router.route('/concerts/:id').delete((req, res) => {
  const id = +req.params.id;
  const index = db.concerts.findIndex((concert) => concert.id === id)

  if (index === -1) {
    res.status(404).send('404 Not found...');
  } else {
    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
  };
})

module.exports = router;
