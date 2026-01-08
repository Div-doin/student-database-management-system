import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: '',
    roll_no: '',
    age: '',
    email: '',
    course: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Simple validation
    if (!form.name || !form.roll_no || !form.age || !form.email || !form.course) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      console.log('Submitting:', form);
      await axios.post('http://localhost:8000/api/students/', form);
      refresh(); // Refresh the student list
      setForm({
        name: '',
        roll_no: '',
        age: '',
        email: '',
        course: ''
      });
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      alert('Submission failed. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="roll_no"
        placeholder="Roll No"
        value={form.roll_no}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={form.course}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
