import React, { useState, useEffect } from 'react';
import OnEvent from 'react-onevent';

const Students = () => {
  const url = 'https://api.hatchways.io/assessment/students'
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [addTag, setAddTag] = useState([]);
  const [tagName, setTagName] = useState('');

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

  function handleChange(event) {
    setTagName(event.target.value)
  }

  function handleAdd() {
    const tagList = addTag.concat({ tagName });

    setAddTag(tagList);
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
          <input
            type="text"
            placeholder="Search by tag"
            id="Search-input"
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>
      {filteredStudents.map((student) => (
        <div key={student.id} className="Flex">
          <button className="Expand-btn" onClick={() => toggleExpand(student.id)}>{isExpanded.includes(student.id) ? '-' : '+'}</button>

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

            {addTag.map((item) => (
              <p className="Tags" key={item.id}>{item.tagName}</p>
            ))}

            <OnEvent space={(event) => handleAdd(event.target.value)}>
              <form>
                <input
                  className="Add-tag"
                  type="text"
                  value={tagName}
                  onChange={handleChange}
                  placeholder="Add a tag"
                />
              </form>
            </OnEvent>
          </div>
        </div>
      ))}

    </div>
  )
};


export default Students;