const pool = require("../db");

exports.getUserPosts = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM posts WHERE author = $1", 
      [req.params.id]
    );

    for (let i=0; i<data.rows.length; i++) {
      const user = await pool.query(
        "SELECT * FROM users WHERE id = $1", 
        [data.rows[i].author]
      );

      data.rows[i].author = user.rows[0]
    }

    res.status(200).json(data.rows);

  } catch (err) {
    console.error(err.message)
    //res.status(501).send({ message: err.message });
  }
};

exports.getPosts = async (_req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM posts");

    //Get list of all post authors
    for (let i=0; i<posts.rows.length; i++) {
      const user = await pool.query(
        "SELECT * FROM users WHERE id = $1", 
        [posts.rows[i].author]
      );

      const commentNumData = await pool.query(
        "SELECT COUNT(*) FROM comments WHERE post = $1", 
        [posts.rows[i].id]
      );

      posts.rows[i].author = user.rows[0];
      posts.rows[i].commentNum = commentNumData.rows[0].count;
    }

    res.json(posts.rows.reverse());
  } catch (err) {
    console.error(err.message);
  }
};

exports.getPostbyID = async (req, res) => {
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

    const commentNumData = await pool.query(
      "SELECT COUNT(*) FROM comments WHERE post = $1", 
      [posts.rows[0].id]
    );

    //add user object to the post
    posts.rows[0].author = users.rows[0]
    posts.rows[0].commentNum = commentNumData.rows[0].count;

    res.json(posts.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

exports.createPost = async (req, res) => {
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
};

exports.getPostComments = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM comments WHERE author = $1", 
      [req.params.id]
    );

    for (let i=0; i<data.rows.length; i++) {
      const user = await pool.query(
        "SELECT * FROM users WHERE id = $1", 
        [data.rows[i].author]
      );

      data.rows[i].author = user.rows[0]
    }

    res.status(200).json(data.rows);

  } catch (err) {
    console.error(err.message)
    //res.status(501).send({ message: err.message });
  }
};
