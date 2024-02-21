// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SectorsPage from './Pages/SectorsPage';
import FormPage from './Pages/FormPage';
import UpdateForm from './Pages/UpdateForm';

function App() {
  // State to store the sectors data
  const [sectors, setSectors] = useState([]);
  const [sectorToEdit, setSectorToEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sectors`); // Replace with your server URL
      const data = await response.json();
      setSectors(data.sectors || []); // Set the fetched data to the state
    } catch (error) {
      console.error('Error fetching sectors:', error);
    }
  };
  // Use useEffect to fetch data from the server when the component mounts
  useEffect(() => { 
    fetchData();
  }, []);

  const onAddSector = async (newSector) => {
    if (sectorToEdit !== null) {
      try {
        // Make sure you have the necessary data for the update (newSector, sectorId, etc.)
        const sectorId = sectorToEdit[editIndex]._id;
        console.log(sectorId);
        const response = await fetch(`http://localhost:3000/updateSectors/${sectorId}`, {
          method: 'PUT', // Assuming you are using the PUT method for updates
          headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify(newSector),
        });
          const updatedData = await response.json();
          fetchData();
      } catch (error) {
        console.error('Error updating sector:', error);
      }
      setSectorToEdit(null);
    } else {
      // If adding a new sector, wait for the response and then update the state
      try {
        const response = await fetch('http://localhost:3000/sectors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSector),
        });
        const savedSector = await response.json();
        fetchData();
      } catch (error) {
        console.error('Error adding sector:', error);
      }
    }
  };

  const onDeleteSector = (index) => {
    // Delete the sector at the specified index
    const updatedSectors = [...sectors];
    
    const deletedSector = updatedSectors.splice(index, 1)[0];
    setSectors(updatedSectors);
    return deletedSector;
  };

  const onEditSector = (sector, index) => {
    setSectorToEdit(sector);
    setEditIndex(index);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SectorsPage sectors={sectors} onDeleteSector={onDeleteSector} onEditSector={onEditSector}/>}
        />
        <Route
          path="/form"
          element={<FormPage onAddSector={onAddSector} />}
        />
        <Route
          path="/edit"
          element={<UpdateForm onAddSector={onAddSector} sectorToEdit={sectorToEdit} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
