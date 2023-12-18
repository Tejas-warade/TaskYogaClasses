// AdmissionForm.js
import React, { useState } from 'react';
import './AdmissionForm.css'

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    selectedBatch: '',
    selectedBatchNextMonth: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Add this line to log the form data

    // Add age validation
    if (formData.age < 18 || formData.age > 65) {
      console.error('Age must be between 18 and 65.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      // Handle success or error response from the backend
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Yoga Class Admission</h1>

      <div className='data'>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className='data'>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </div>

      <div className='data'>
        <label>Select Batch:</label>
        <select name="selectedBatch" value={formData.selectedBatch} onChange={handleChange} required>
          <option value="" disabled>Select Batch</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
      </div>

      <div className="data">
        <label>Select Batch Next Month:</label>
        <select name="selectedBatchNextMonth" value={formData.selectedBatchNextMonth} onChange={handleChange} required>
          <option value="" disabled>Select Batch Next Month</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AdmissionForm;
