const express = require('express')
const cors = require('cors')
const pool = require('./db')
const controller = require('./controllers/authController')
const postController = require('./controllers/postController')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (_req, res) => {
  try {
    res.send('Welcome to the THMMY API')
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/users', async (_req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users')
    res.json(users.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.post('/users', async (req, res) => {
  try {
    const { username, name } = req.body

    const posts = await pool.query(
      '\
      INSERT INTO users (id,username,name) \
      VALUES (DEFAULT,$1,$2) \
      RETURNING *',
      [username, name]
    )

    res.json(posts.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(400).send()
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params

    const users = await pool.query('SELECT * FROM users WHERE id = $1', [id])

    res.json(users.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/users/get/:username', async (req, res) => {
  try {
    const { username } = req.params

    const users = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ])

    let user = users.rows[0]

    if (!user) {
      res.status(404).send('Invalid username')
    }

    res.json(users.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/posts', postController.getPosts)
app.get('/posts/:id', postController.getPostbyID)
app.get('/posts/:id/comments', postController.getPostComments)

app.post('/posts', postController.createPost)

app.get('/users/:id/posts', postController.getUserPosts)

app.post('/auth/signin', controller.signin)
app.post('/auth/signup', controller.signup)

app.listen(4000, () => {
  console.log('Listening at port 4000!')
})
