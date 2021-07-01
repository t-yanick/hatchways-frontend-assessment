import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const Students = () => {
  const url = 'https://api.hatchways.io/assessment/students'
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (results) => {
          setStudents(results.students);
        }
      )

  }, [])

  return (
    <div>
      {students.map((student) => (
        <React.Fragment key={student.id}>
          <img alt="" src={student.pic} />
          <h1>{student.firstName} {student.lastName}</h1>
          <p>Email:{student.email}</p>
          <p>Company:{student.company}</p>
          <p>Skill:{student.skill}</p>
          <p>Average: {(student.grades.reduce((a, b) => parseInt(b) + a, 0))
            / (student.grades.map((grade) => grade).length)}%
                </p>

        </React.Fragment>
      ))}

    </div>
  )
};


export default Students;