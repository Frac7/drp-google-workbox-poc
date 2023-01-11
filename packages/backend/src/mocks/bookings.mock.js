const uuid4 = require("uuid4");

const bookings = [
  {
    id: uuid4(),
    date: new Date(2023, 1, 7),
    desk: 16,
  },
  {
    id: uuid4(),
    date: new Date(2023, 1, 13),
    desk: 18,
  },
  {
    id: uuid4(),
    date: new Date(2023, 1, 24),
    desk: 20,
  },
  {
    id: uuid4(),
    date: new Date(2023, 1, 28),
    desk: 22,
  },
];

module.exports = bookings;
