import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = ({ showAlert, refresh }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/students/', {
        params: { search }
      });
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      showAlert('Failed to load students.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const deleteStudent = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
      showAlert(`${name} deleted successfully.`, 'success');
      fetchStudents();
    } catch (error) {
      console.error('Delete failed:', error);
      showAlert('Failed to delete student.', 'error');
    }
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditForm({ ...student });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, editForm);
      showAlert('Student updated successfully! ✓', 'success');
      setEditingId(null);
      setEditForm({});
      fetchStudents();
    } catch (error) {
      console.error('Update failed:', error);
      showAlert('Failed to update student.', 'error');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>
          <span className="icon">📋</span>
          Student Records ({students.length})
        </h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, roll number, or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>{search ? 'No students found matching your search.' : 'No students added yet. Add your first student!'}</p>
        </div>
      ) : (
        <div className="student-list">
          {students.map((student) => (
            <div key={student.id} className="student-item">
              {editingId === student.id ? (
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Name"
                      style={{ padding: '8px', borderRadius: '6px', border: '2px solid #e0e0e0' }}
                    />
                    <input
                      type="text"
                      name="roll_no"
                      value={editForm.roll_no}
                      onChange={handleEditChange}
                      placeholder="Roll No"
                      style={{ padding: '8px', borderRadius: '6px', border: '2px solid #e0e0e0' }}
                    />
                    <input
                      type="number"
                      name="age"
                      value={editForm.age}
                      onChange={handleEditChange}
                      placeholder="Age"
                      style={{ padding: '8px', borderRadius: '6px', border: '2px solid #e0e0e0' }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      placeholder="Email"
                      style={{ padding: '8px', borderRadius: '6px', border: '2px solid #e0e0e0' }}
                    />
                    <input
                      type="text"
                      name="course"
                      value={editForm.course}
                      onChange={handleEditChange}
                      placeholder="Course"
                      style={{ padding: '8px', borderRadius: '6px', border: '2px solid #e0e0e0', gridColumn: 'span 2' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => saveEdit(student.id)} className="btn btn-edit">
                      ✓ Save
                    </button>
                    <button onClick={cancelEdit} className="btn btn-danger">
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="student-info">
                    <div className="student-name">{student.name}</div>
                    <div className="student-details">
                      <div className="detail-item">
                        <span className="detail-label">Roll No:</span>
                        <span>{student.roll_no}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Age:</span>
                        <span>{student.age}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span>{student.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Course:</span>
                        <span>{student.course}</span>
                      </div>
                    </div>
                  </div>
                  <div className="student-actions">
                    <button onClick={() => startEdit(student)} className="btn btn-edit">
                      ✎ Edit
                    </button>
                    <button onClick={() => deleteStudent(student.id, student.name)} className="btn btn-danger">
                      🗑 Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;