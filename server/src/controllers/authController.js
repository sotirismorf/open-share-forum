const jwt = require("jsonwebtoken");

const pool = require("../db");

exports.signin = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM users WHERE username = $1", 
      [req.body.username]
    );

    let user = data.rows[0];

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var token = jwt.sign({ id: user.id }, 'hello', {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      //email: user.email,
      //roles: authorities,
      accessToken: token
    });

  } catch (err) {
    console.error(err.message)
    //res.status(501).send({ message: err.message });
  }
};
