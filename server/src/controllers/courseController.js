
const pool = require('../db')

exports.getCourses = async (req, res) => {
  const { page } = req.params

  try {
    const data = await pool.query('SELECT * FROM courses')

    res.status(200).json(data.rows)
  } catch (err) {
    console.error(err.message)
    //res.status(501).send({ message: err.message });
  }
}
