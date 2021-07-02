import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const Students = () => {
  const url = 'https://api.hatchways.io/assessment/students'
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (results) => {
          setStudents(results.students);
        }
      )

  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter(student => {
        return student.firstName.toLowerCase().includes(search.toLowerCase())
          || student.lastName.toLowerCase().includes(search.toLowerCase());
      })
    )
  }, [search, students]);

  const toggleExpand = (id) => {
    if (isExpanded.includes(id)) {
      setIsExpanded(isExpanded.filter(studentId => studentId !== id))
    } else {
      let newExpanded = [...isExpanded]
      newExpanded.push(id)
      setIsExpanded(newExpanded)
    }
  }

  return (
    <div className="row Student-container">
      <div>
        <form>
          <input
            type="text"
            placeholder="Search by name"
            id="Search-input"
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>
      {filteredStudents.map((student) => (
        <div key={student.id} className="Flex">
          <div className="Img-div col-md-6 Student-info">
            <img alt="avatar" src={student.pic} />
          </div>

          <div className="Info-div col-md-6 Student-info">

            <h1 className="Name">{student.firstName.toUpperCase()} {student.lastName.toUpperCase()}</h1>


            <ul className="Info-list">
              <li>Email: {student.email}</li>
              <li>Company: {student.company}</li>
              <li>Skill: {student.skill}</li>
              <li>Average: {(student.grades.reduce((a, b) => parseInt(b) + a, 0))
                / (student.grades.map((grade) => grade).length)}%
              </li>
            </ul>
            {isExpanded.includes(student.id) ? (
              <div className="Grades">
                {student.grades.map((grade, index) => <li key={grade.id}>Test {index + 1}:<span>{grade}%</span></li>)}
              </div>
            ) : null}
          </div>
          <button className="Expand-btn" onClick={() => toggleExpand(student.id)}>{isExpanded.includes(student.id) ? '-' : '+'}</button>
        </div>
      ))}

    </div>
  )
};


export default Students;