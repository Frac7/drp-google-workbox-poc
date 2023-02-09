# drp-google-workbox-poc
Desk Reservation Platform built with Google Workbox to enhance PWA development

This project shows some basic use cases related to the development of a PWA using the Workbox library.

This project is a monorepo that uses Lerna. It is composed by the backend, a simple Express application, and the frontend, a React application bootstrapped using create-react-app with the PWA Typescript template.

## Getting started
1. Install all the dependencies by running `npm i` in the root of the project - this command will install Lerna. Then run `npm run install-all` to install all the packages dependencies.
2. Create the `.env`file for the backend and for the frontend following the `.env.example` file.
3. Run `npm run serve` to execute the project. This command starts the backend server and the frontend production server - needed for the service worker to work.

## Use cases
1. Static assets precaching: static assets are cache when the service worker is in the installation phase and are available also when the app works offline.
2. Background sync: failed request for getting, creating and deleting a reservation are retried when the app comes online.
3. Broadcast update: the request that fetches the reservations uses the stale-while-revalidate strategy. When a fresh response is detected, each client is notified, so that it can update displayed data.


