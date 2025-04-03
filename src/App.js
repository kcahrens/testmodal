import React, { useState } from 'react';
import NewReportModal from './NewReportModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <img src="/pictures/Part.jpeg" alt="Debug" style={{ maxWidth: '200px' }} />
      {isModalOpen && <NewReportModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default App;