const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const pool = require('../db')
const { user } = require('pg/lib/defaults')

exports.signup = async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM users WHERE username = $1', [
      req.body.username,
    ])

    if (data.rowCount != 0) {
      return res.status(404).send({ message: 'Username not available' })
    }

    const userData = await pool.query(
      '\
      INSERT INTO users (id,username,name) \
      VALUES (DEFAULT,$1,$2) \
      RETURNING *',
      [req.body.username, '']
    )

    let user = userData.rows[0]
    console.log(user)

    bcrypt.hash(req.body.password, 8, async (err, hash) => {
      if (err) {
        console.log(err.message)
      } else {
        const passwordData = await pool.query(
          '\
          INSERT INTO passwords (id,password) \
          VALUES ($1,$2) \
          RETURNING *',
          [user.id, hash]
        )
        res.send({
          user: user,
        })
      }
    })
  } catch (err) {
    console.error(err.message)
    //res.status(501).send({ message: err.message });
  }
}

exports.signin = async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM users WHERE username = $1', [
      req.body.username,
    ])

    let user = data.rows[0]

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const passwordData = await pool.query(
      'SELECT * FROM passwords WHERE id = $1',
      [user.id]
    )

    if (passwordData.rowCount == 0) {
      return res.status(404).send({ message: 'Error Validating Password.' })
    }

    let hash = passwordData.rows[0].password

    bcrypt.compare(req.body.password, hash, function (err, result) {
      if (err) {
        console.log(err.message)
      } else if (!result) {
        return res.status(404).send({
          message: 'Wrong Password.',
        })
      } else if (result) {
        var token = jwt.sign({ id: user.id }, 'hello', {
          expiresIn: 86400, // 24 hours
        })

        res.status(200).send({
          id: user.id,
          username: user.username,
          //email: user.email,
          //roles: authorities,
          accessToken: token,
        })
      }
    })
  } catch (err) {
    console.error(err.message)
    //res.status(501).send({ message: err.message });
  }
}
