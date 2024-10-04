// components/elements/MultiformModel.js

import React, { useState } from 'react';
import { db } from '../../config/firebaseConfig'; // Import Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const MultiStepFormModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [students, setStudents] = useState([{ name: '', dtuId: '' }]);
  const [timeline, setTimeline] = useState({
    startDate: '',
    deadline: '',
    tasks: [''],
  });

  const problemId = 'PR123456'; // Sample problem ID
  const problemTitle = 'Develop a robust framework'; // Sample problem title

  const addStudent = () => {
    setStudents([...students, { name: '', dtuId: '' }]);
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, [field]: value } : student
    );
    setStudents(updatedStudents);
  };

  const handleTimelineChange = (field, value) => {
    setTimeline({ ...timeline, [field]: value });
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = timeline.tasks.map((task, i) =>
      i === index ? value : task
    );
    setTimeline({ ...timeline, tasks: updatedTasks });
  };

  const addTask = () => {
    setTimeline({ ...timeline, tasks: [...timeline.tasks, ''] });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Add a new document to the "group" collection in Firestore
      const docRef = await addDoc(collection(db, "group"), {
        problemId,
        problemTitle,
        students,
        timeline,
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset form after submission
      setStudents([{ name: '', dtuId: '' }]);
      setTimeline({
        startDate: '',
        deadline: '',
        tasks: [''],
      });

      onClose(); // Close the modal after submission
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div
      style={{
        display: isOpen ? 'flex' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          width: '90%',
          maxWidth: '500px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          animation: 'slide-down 0.3s ease-out forwards',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#444',
          }}
        >
          &times;
        </button>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Apply for Project
        </h2>

        {currentStep === 1 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>Student Details</h3>
            {students.map((student, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <input
                  type="text"
                  placeholder="Student Name"
                  value={student.name}
                  onChange={(e) =>
                    handleStudentChange(index, 'name', e.target.value)
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    marginBottom: '5px',
                    boxSizing: 'border-box',
                    fontSize: '14px',
                  }}
                />
                <input
                  type="email"
                  placeholder="DTU ID (e.g., student@dtu.ac.in)"
                  value={student.dtuId}
                  onChange={(e) =>
                    handleStudentChange(index, 'dtuId', e.target.value)
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    boxSizing: 'border-box',
                    fontSize: '14px',
                  }}
                  pattern=".+@dtu\.ac\.in"
                />
              </div>
            ))}
            <button
              onClick={addStudent}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              + Add Student
            </button>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <button
                onClick={() => setCurrentStep(2)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>Project Timeline</h3>
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={timeline.startDate}
              onChange={(e) =>
                handleTimelineChange('startDate', e.target.value)
              }
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                marginBottom: '10px',
                boxSizing: 'border-box',
                fontSize: '14px',
              }} 
            />
            <label>End Date</label>
            <input
              type="date"
              placeholder="Deadline"
              value={timeline.deadline}
              onChange={(e) => handleTimelineChange('deadline', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                marginBottom: '10px',
                boxSizing: 'border-box',
                fontSize: '14px',
              }}
            />
            {timeline.tasks.map((task, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                }}
              >
                <input
                  type="text"
                  placeholder={`Task for Month ${index + 1}`}
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    boxSizing: 'border-box',
                    fontSize: '14px',
                  }}
                />
              </div>
            ))}
            <button
              onClick={addTask}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              + Add Task
            </button>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <button
                onClick={() => setCurrentStep(1)}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepFormModal;

