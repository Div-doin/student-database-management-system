import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/students/', {
        params: { search }
      });
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
      fetchStudents();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              <strong>{s.name}</strong> | Roll No: {s.roll_no} | Age: {s.age} | Email: {s.email} | Course: {s.course}
              <button onClick={() => deleteStudent(s.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;


