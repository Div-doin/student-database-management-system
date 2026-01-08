import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ refresh, showAlert }) => {
  const [form, setForm] = useState({
    name: '',
    roll_no: '',
    age: '',
    email: '',
    course: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.roll_no || !form.age || !form.email || !form.course) {
      showAlert('Please fill in all fields.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Age validation
    if (form.age < 5 || form.age > 100) {
      showAlert('Please enter a valid age (5-100).', 'error');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/students/', form);
      showAlert(`Student ${form.name} added successfully! 🎉`, 'success');
      refresh();
      setForm({
        name: '',
        roll_no: '',
        age: '',
        email: '',
        course: ''
      });
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.roll_no 
        ? 'Roll number already exists!' 
        : err.response?.data?.email 
        ? 'Email already exists!' 
        : 'Failed to add student. Please try again.';
      showAlert(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <span className="icon">➕</span>
          Add New Student
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter student name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roll_no">Roll Number</label>
          <input
            type="text"
            id="roll_no"
            name="roll_no"
            placeholder="Enter roll number"
            value={form.roll_no}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter age"
            value={form.age}
            onChange={handleChange}
            min="5"
            max="100"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            placeholder="Enter course name"
            value={form.course}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '⏳ Adding Student...' : '✓ Add Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;