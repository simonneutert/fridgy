const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

const bearer = process.env.BEARER

var currentUser = 0

let app = express()

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}

app.use(cors(corsOptions))

app.use(function (req, res, next) {
  // stupid authorization :-)
  if (process.env.NODE_ENV === 'production' && req.get('Authorization') === `Bearer ${bearer}`) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Authorization, X-Requested-With, Content-Type, Accept')
    next()
  } else {
    res.status(404).send('Sorry, we cannot find that!')
  }
})

app.use(bodyParser.json())

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './database/fridgy.sqlite'
})

// Define our User model
// name, email, rfid_key, karma, credit_debit
let User = database.define('users', {
  name: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  rfid_key: Sequelize.STRING,
  karma: Sequelize.TINYINT,
  credit_debit: Sequelize.DECIMAL
})

// Define our Product model
// id, createdAt, and updatedAt are added by sequelize automatically
let Product = database.define('products', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  calories: Sequelize.TINYINT,
  price: Sequelize.DECIMAL,
  amount: Sequelize.TINYINT,
  karma: Sequelize.TINYINT
})

// Define our Transaction model
let Ledger = database.define('ledger', {
  amount: Sequelize.DECIMAL,
  purpose: Sequelize.STRING,
  date: Sequelize.DATE
})
Ledger.belongsTo(User)
Ledger.belongsTo(Product)

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

app.get('/user', function (req, res) {
  User.findOne({
    where: {
      id: currentUser
    }
  })
    .then(function (user) {
      if (user) {
        res.json(user)
        currentUser = 0
      } else {
        res.status(404).send('not found')
      }
    })
})

app.post('/user/:rfid', function (req, res) {
  User.findOne({
    where: {
      rfid_key: req.params.rfid
    }
  })
    .then(function (user) {
      if (user) {
        currentUser = user.id
      }
    })
  res.send('currentUser is: ' + currentUser)
})

app.delete('/user', function (req, res) {
  currentUser = 0
})

// Create the dynamic REST resource for our Post model
let productResource = epilogue.resource({
  model: Product,
  endpoints: ['/products', '/products/:id']
})

let shopResource = epilogue.resource({
  model: User,
  endpoints: ['/users', '/users/:id']
})

epilogue.resource({
  model: Ledger,
  endpoints: ['/ledgers', '/ledgers/:id']
  // pagination: false
})

app.get('/ledgers/sum/:userid', function (req, res) {
  Ledger.sum('amount', {
    where: {
      userId: req.params.userid
    }
  })
    .then(function (sum) {
      if (sum) {
        res.json(sum)
      } else {
        res.status(404).send('not found')
      }
    })
})

// Resets the database and launches the express app on :8081
// .sync({ force: true })
database
  .sync()
  .then(() => {
    // User.findOrCreate({where: {name: "DBr", firstname: "David", lastname: "Brookx", rfid_key: 316023195878}})
    // User.findOrCreate({where: {name: "JS", firstname: "Jens", lastname: "Schneezin", rfid_key: 590504744560}})
    app.listen(8081, '0.0.0.0', () => {
      console.log('listening to port localhost:8081')
    })
  })
