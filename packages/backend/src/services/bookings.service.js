const uuid4 = require("uuid4");
const bookings = require("../mocks/bookings.mock");

const list = () => {
  return bookings;
};

const get = (id) => {
  return bookings.find((booking) => booking.id === id);
};

const create = (booking) => {
  bookings.push({
    ...booking,
    id: uuid4(),
  });
};

const remove = (id) => {
  const toRemoveIndex = bookings.findIndex((booking) => booking.id === id);
  bookings.splice(toRemoveIndex, 1);
};

module.exports = { list, get, create, remove };
