const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

const pool = require('./db')

const controller = require('./controllers/authController')
const postController = require('./controllers/postController')
const downloadsController = require('./controllers/downloadsController')
const courseController = require('./controllers/courseController')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload({
		createParentPath: true
}));

app.use('/downloads/preview', express.static('/home/sotiris/thmmyrepository'))

app.get('/downloads/get/:file', async (req, res) => {
  const file = `/home/sotiris/thmmyrepository/${req.params.file}`

  const fileData = await pool.query(
    'SELECT name,filetype FROM files WHERE id=$1',
    [req.params.file]
  )
  try {
    const { name, filetype } = fileData.rows[0]
    res.download(`${file}.${filetype}`, `${name}.${filetype}`)

  } catch (err) {
    re.sendStatus('404 not found')
    console.log(err.message)
  }
})

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

app.get('/courses/:cycle/:semester/', downloadsController.getCourses)
app.get('/downloads/:course/', downloadsController.getDownloads)
app.post('/downloads', downloadsController.newUpload)

app.get('/courses', courseController.getCourses)

app.post('/auth/signin', controller.signin)
app.post('/auth/signup', controller.signup)

app.listen(4000, () => {
  console.log('Listening at port 4000!')
})
