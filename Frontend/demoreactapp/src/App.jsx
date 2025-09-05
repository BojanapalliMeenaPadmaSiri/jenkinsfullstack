import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import config from "./config";   // <-- import config


function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    department: "",
    email: "",
  });

  // For Edit Modal
  const [editEmployee, setEditEmployee] = useState(null);

  // For Delete Confirmation
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

  // Fetch employees
  useEffect(() => {
    axios
      .get("http://localhost:2030/backend/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // Add employee
  const addEmployee = () => {
    axios
      .post("http://localhost:2030/backend/api/employees", newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setNewEmployee({
          firstName: "",
          lastName: "",
          department: "",
          email: "",
        });
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  // Confirm Delete
  const confirmDelete = (id) => {
    setDeleteEmployeeId(id);
  };

  // Delete employee after confirmation
  const deleteEmployee = () => {
    axios
      .delete(`http://localhost:2030/backend/api/employees/${deleteEmployeeId}`)
      .then(() => {
        setEmployees(employees.filter((emp) => emp.id !== deleteEmployeeId));
        setDeleteEmployeeId(null);
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // Open Edit Modal
  const openEditModal = (emp) => {
    setEditEmployee({ ...emp });
  };

  // Handle Edit Form Change
  const handleEditChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
  };

  // Save Edited Employee
  const saveEdit = () => {
    axios
      .put(`http://localhost:2030/backend/api/employees/${editEmployee.id}`, editEmployee)
      .then((response) => {
        setEmployees(
          employees.map((emp) =>
            emp.id === editEmployee.id ? response.data : emp
          )
        );
        setEditEmployee(null); // close modal
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {/* Add Employee Form */}
      <h2>Add Employee</h2>
      <div className="form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newEmployee.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newEmployee.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={newEmployee.department}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={handleChange}
        />
        <button onClick={addEmployee}>Add</button>
      </div>

      {/* Employee Table */}
      <h2>Employees</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4">No employees added yet.</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  {emp.firstName} {emp.lastName}
                </td>
                <td>{emp.department}</td>
                <td>{emp.email}</td>
                <td>
                  <div className="buttons">
                    <button className="edit" onClick={() => openEditModal(emp)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => confirmDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {/* Edit Modal */}
{editEmployee && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Edit Employee</h3>
      <input
        type="text"
        name="firstName"
        value={editEmployee.firstName}
        onChange={handleEditChange}
        className="modal-input"
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={editEmployee.lastName}
        onChange={handleEditChange}
        className="modal-input"
        placeholder="Last Name"
      />
      <input
        type="text"
        name="department"
        value={editEmployee.department}
        onChange={handleEditChange}
        className="modal-input"
        placeholder="Department"
      />
      <input
        type="email"
        name="email"
        value={editEmployee.email}
        onChange={handleEditChange}
        className="modal-input"
        placeholder="Email"
      />

      <div className="modal-buttons">
        <button className="btn-save" onClick={saveEdit}>
          Save
        </button>
        <button className="btn-cancel" onClick={() => setEditEmployee(null)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* Delete Confirmation Modal */}
{deleteEmployeeId && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Are you sure you want to delete this employee?</h3>
      <div className="modal-buttons">
        <button className="btn-delete" onClick={deleteEmployee}>
          Yes, Delete
        </button>
        <button className="btn-cancel" onClick={() => setDeleteEmployeeId(null)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Delete Confirmation Modal */}
      {deleteEmployeeId && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Are you sure you want to delete this employee?</h3>
      <div className="modal-buttons">
        <button className="btn-delete" onClick={deleteEmployee}>
          Yes, Delete
        </button>
        <button className="btn-cancel" onClick={() => setDeleteEmployeeId(null)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default App;
