const express = require('express')
const cors = require('cors')
const pool = require('./db')
const controller = require('./controllers/authController')
const postController = require('./controllers/postController')
const downloadsController = require('./controllers/downloadsController')
const courseController = require('./controllers/courseController')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/downloads/preview', express.static('/home/sotiris/testing'))

app.get('/downloads/get/:file', (req, res) => {
  const file = `/home/sotiris/testing/10.pdf`;
  res.download(file); // Set disposition and send it.
});

app.get('/', async (_req, res) => {
  try {
    res.send('Welcome to the THMMY API')
  } catch (err) {
    console.error(err.message)
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

app.get('/downloads/page/:page', downloadsController.getDownloads)
app.post('/downloads', downloadsController.newUpload)

app.get('/courses', courseController.getCourses)

app.post('/auth/signin', controller.signin)
app.post('/auth/signup', controller.signup)

app.listen(4000, () => {
  console.log('Listening at port 4000!')
})
