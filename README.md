# Worksheets Warrior

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

npm and Node.js installed

### Installing

A step by step series of examples that tell you how to get a development env running

Installing npm modules of both client and server folder

```
cd client && npm install
```

```
cd server && npm install
```

Creating uploads folder in server directory

```
mkdir public && mkdir public/uploads && mkdir public/uploads/categories && mkdir public/uploads/customize && mkdir public/uploads/orders && mkdir public/uploads/products
```

Create .env in server folder with template below (Create an account on [Braintree](https://www.braintreepayments.com/sandbox?referrer=https%3A%2F%2Fwww.google.com%2F) to get Sandbox credentials)
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
npm run dev
```

and open another terminal on client directory
```
npm start
```

### Running the tests

### Deployment

### Built With

* [React](https://reactjs.org/) - The front-end web framework
* [Node.js](https://nodejs.org/en/) - JavasScript runtime
* [Express.js](https://expressjs.com/) - Node.js web application framework
* [MongoDB](https://www.mongodb.com/) - Popular document database

### Credit 

Thanks to

[![Alt text](https://img.youtube.com/vi/lXk14qt2D28/0.jpg)](https://www.youtube.com/watch?v=lXk14qt2D28)
