const service = require("../services/bookings.service");

const list = (_, res) => {
  const bookings = service.list();
  res.json(bookings);
};

const get = (req, res) => {
  const id = req.params.id;
  const booking = service.get(id);
  res.json(booking);
};

const create = (req, res) => {
  const booking = req.body;
  service.create(booking);
  res.json({});
};

const remove = (req, res) => {
  const id = req.params.id;
  service.remove(id);
  res.json({});
};

module.exports = { list, get, create, remove };
