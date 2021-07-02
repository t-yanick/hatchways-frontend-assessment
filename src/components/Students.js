import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const Students = () => {
  const url = 'https://api.hatchways.io/assessment/students'
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (results) => {
          setStudents(results.students);
        }
      )

  }, [])

  useEffect(() => {
    setFilteredStudents(
      students.filter(student => {
        return student.firstName.toLowerCase().includes(search.toLowerCase())
          || student.lastName.toLowerCase().includes(search.toLowerCase());
      })
    )
  }, [search, students])

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
            <h1 className="Name">{student.firstName} {student.lastName}</h1>
            <p>&nbsp;&nbsp; Email: {student.email}</p>
            <p>&nbsp;&nbsp; Company: {student.company}</p>
            <p>&nbsp;&nbsp; Skill: {student.skill}</p>
            <p>&nbsp;&nbsp; Average: {(student.grades.reduce((a, b) => parseInt(b) + a, 0))
              / (student.grades.map((grade) => grade).length)}%
            </p>
          </div>

        </div>
      ))}

    </div>
  )
};


export default Students;