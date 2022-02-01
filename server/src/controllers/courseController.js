
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

exports.newUpload = async (req, res) => {
  try {
    const data = await pool.query(
      'INSERT INTO files \
      (author,name,filetype,description,detail,course,year,is_exam,exam_semester,has_solutions) \
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) \
      RETURNING *',
      [1,"first post","pdf","simple descr","omadaA",1,2022,false,0,false]
    )

    res.status(200).json(data.rows)
  } catch (err) {
    console.error(err.message)
    res.status(501).send({ message: err.message });
  }
}
