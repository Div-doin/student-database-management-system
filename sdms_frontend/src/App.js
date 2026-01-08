import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [alert, setAlert] = useState(null);

  const refresh = () => setRefreshFlag(!refreshFlag);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>🎓 Student Database Management System</h1>
        <p>Manage student records with ease and efficiency</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="main-container">
        <StudentForm refresh={refresh} showAlert={showAlert} />
        <StudentList key={refreshFlag} showAlert={showAlert} refresh={refresh} />
      </div>
    </div>
  );
}

export default App;