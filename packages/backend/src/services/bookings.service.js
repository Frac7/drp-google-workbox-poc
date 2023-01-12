const uuid4 = require("uuid4");
const bookings = require("../mocks/bookings.mock");

const list = (month) => {
  return bookings
    .filter((booking) => booking.date.getMonth() === parseInt(month))
    .reduce((acc, curr) => ({ ...acc, [curr.date.getDate()]: curr.id }), {});
};

const get = (id) => {
  return bookings.find((booking) => booking.id === id);
};

const create = ({ date, desk }) => {
  bookings.push({
    desk,
    date: new Date(date),
    id: uuid4(),
  });
};

const remove = (id) => {
  const toRemoveIndex = bookings.findIndex((booking) => booking.id === id);
  bookings.splice(toRemoveIndex, 1);
};

module.exports = { list, get, create, remove };
