const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = process.argv[2] || 'JUL02';
const values = [cohortName];

pool
  .query(
    `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`, values
  )
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(
        `${row.cohort}: ${row.teacher}`
      );
    });
  })
  .catch((err) => console.error("query error", err.stack));