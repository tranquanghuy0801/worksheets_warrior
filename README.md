# Worksheets Warrior

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

npm and Node.js installed

### Installing

A step by step series of examples that tell you how to get a development env running

Installing npm modules

```
npm install
```

Creating uploads folder in server directory

```
mkdir public && mkdir public/uploads && mkdir public/uploads/categories && mkdir public/uploads/customize && mkdir public/uploads/worksheets && mkdir public/uploads/worksheets-images
```

Create .env in the main directory with template below (Create an account on [Braintree](https://www.braintreepayments.com/sandbox?referrer=https%3A%2F%2Fwww.google.com%2F) to get Sandbox credentials)
```
DATABASE=mongodb://localhost/ecommerce
PORT=8000
BRAINTREE_MERCHANT_ID=***
BRAINTREE_PUBLIC_KEY=***
BRAINTREE_PRIVATE_KEY=***
```

### Running the app

Open a terminal on server directory

```
npm run start:server
```

and open another terminal on client directory
```
npm run start:client
```

### Running the tests

### Deployment

Run these commands to build the client directory and run on the server

```
npm run build:client
npm run start:server
```

### Built With

* [React](https://reactjs.org/) - The front-end web framework
* [Node.js](https://nodejs.org/en/) - JavasScript runtime
* [Express.js](https://expressjs.com/) - Node.js web application framework
* [MongoDB](https://www.mongodb.com/) - Popular document database

### Credit 

Thanks to

[![Alt text](https://img.youtube.com/vi/lXk14qt2D28/0.jpg)](https://www.youtube.com/watch?v=lXk14qt2D28)
