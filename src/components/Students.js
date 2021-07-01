import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Students = () => {
  const url = 'https://api.hatchways.io/assessment/students'
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setStudent(console.log(response.data))
      })
  }, [url])



  return (
    <div>
      <h3>Students due assessment</h3>
    </div>
  );

};

export default Students;