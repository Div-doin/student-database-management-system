import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refresh = () => setRefreshFlag(!refreshFlag);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Student Database Management</h1>
      <StudentForm refresh={refresh} />
      <hr />
      <StudentList key={refreshFlag} />
    </div>
  );
}

export default App;

