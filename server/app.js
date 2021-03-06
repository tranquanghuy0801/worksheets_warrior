const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

// Import Router
const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/categories')
const productRouter = require('./routes/products')
const brainTreeRouter = require('./routes/braintree')
const orderRouter = require('./routes/orders')
const usersRouter = require('./routes/users')
const customizeRouter = require('./routes/customize')
const descriptorFirstRouter = require('./routes/descriptorFirst')
const descriptorSecondRouter = require('./routes/descriptorSecond')
const descriptorThirdRouter = require('./routes/descriptorThird')

// Import Auth middleware
const { loginCheck } = require('./middleware/auth')

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      '==============Mongodb Database Connected Successfully=============='
    )
  )
  .catch((err) => console.log('Database Not Connected !!!'))

// Middleware
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))
app.use(express.static(path.join(__dirname + '../../', 'build')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use('/api', authRouter)
app.use('/api/user', usersRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api', brainTreeRouter)
app.use('/api/order', orderRouter)
app.use('/api/customize', customizeRouter)
app.use('/api/descriptor-first', descriptorFirstRouter)
app.use('/api/descriptor-second', descriptorSecondRouter)
app.use('/api/descriptor-third', descriptorThirdRouter)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '../../', 'build', 'index.html'))
})

// let protected = ['membership', 'products']

// app.get("*", (req, res) => {

//   let path_name = req.params['0'].substring(1)
//   console.log(path_name)

//   if (protected.includes(path)) {
//     // Return the actual file
//     res.sendFile(path.join(__dirname + "../../",'build', path_name));
//   } else {
//     // Otherwise, redirect to /build/index.html
//     res.sendFile(path.join(__dirname + "../../",'build', 'index.html'));
//   }
// });

// Run Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('Server is running on ', PORT)
})
