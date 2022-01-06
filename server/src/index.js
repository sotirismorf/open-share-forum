const express = require('express');
const cors = require("cors");
const pool = require("./db");
const controller = require("./controllers/authController");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", async (_req, res) => {
  try {
    res.send('Welcome to the THMMY API');
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users", async (_req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/users", async (req, res) => {
	try {
		const { username, name } = req.body;

    const posts = await pool.query("\
      INSERT INTO users (id,username,name) \
      VALUES (DEFAULT,$1,$2) \
      RETURNING *",
      [username, name]
    );

    res.json(posts.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(400).send();
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const users = await pool.query(
      "SELECT * FROM users WHERE id = $1", 
      [id]
    );

    res.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM posts");

    //Get list of all post authors
    for (let i=0; i<posts.rows.length; i++) {
      const user = await pool.query(
        "SELECT * FROM users WHERE id = $1", 
        [posts.rows[i].author]
      );

      posts.rows[i].author = user.rows[0]
    }

    res.json(posts.rows.reverse());
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/posts", async (req, res) => {
	try {
		const { title, author , body } = req.body;

    const posts = await pool.query("\
      INSERT INTO posts (id,title,date,author,body) \
      VALUES (DEFAULT,$1,DEFAULT,$2,$3) \
      RETURNING *",
      [title, author, body]
    );

    res.json(posts.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const posts = await pool.query(
      "SELECT * FROM posts WHERE id = $1", 
      [id]
    );
    
    const users = await pool.query(
      "SELECT * FROM users WHERE id = $1", 
      [posts.rows[0].author]
    );

    //add user object to the post
    posts.rows[0].author = users.rows[0]

    res.json(posts.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/auth/signin", controller.signin);

app.listen(4000, () => {console.log('Listening at port 4000!')})
