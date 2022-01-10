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
