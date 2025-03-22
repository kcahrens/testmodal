import React, { useState } from 'react';
import NewReportModal from './NewReportModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && <NewReportModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default App;