const express = require('express');
const cors = require("cors");
const pool = require("./db");


const app = express();

app.use(cors());
app.use(express.json());


const sotiris = {
  name:"Sotiris Morfakidis",
  username:"sotirismorf"
}

const comment = {
  author: sotiris,
  body:"nice!",
  date:"Jan 2nd 2021"
}

const posts = [
  {
    id:123456,
    title:"first post",
    author:sotiris,
    date:"Jan 1st 2021",
    body:"This is my first post",
    commentNum:4,
    comments:[]
  },
  {
    id:345456,
    title:"second post",
    body:"This is my second post",
    date:"Jan 1st 2021",
    author:sotiris,
    commentNum:4,
    comments:[comment,comment]
  }
]

app.get("/users", async (req, res) => {
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

    res.json(posts.rows);
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

app.listen(4000)
