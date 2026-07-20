import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, deleteEmployee, getAllEmployee, updateEmployee } from "./employee/employeeSlice";

const App = () => {
  const [employee, setEmployee] = useState({});
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch()
  const employees = useSelector((state) => state.employee.employees);


  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await dispatch(
        updateEmployee({
          id: editId,
          employee,
        })
      );

      setEditId(null);
    } else {
      await dispatch(createEmployee(employee));
    }

    setEmployee({});
  };
  const handleEdit = (emp) => {
    setEmployee(emp);
    setEditId(emp.id);
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="employee-card">

            <h2 className="text-center mb-4">
              Employee Registration
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employee.name || ""}
                  onChange={handleChange}
                  placeholder="Enter employee name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email || ""}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">Department</label>

                  <select
                    className="form-select"
                    name="department"
                    value={employee.department || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option>IT</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Finance</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Salary</label>

                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={employee.salary || ""}
                    onChange={handleChange}
                    placeholder="Enter salary"
                  />
                </div>

              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={employee.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Address</label>

                <textarea
                  rows="3"
                  className="form-control"
                  name="address"
                  value={employee.address || ""}
                  onChange={handleChange}
                  placeholder="Enter address"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 submit-btn">
                {editId ? "Update Employee" : "Add Employee"}
              </button>

            </form>

          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {/* Table */}
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Employee List</h4>
            </div>

            <div className="card-body">
              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.length > 0 ? (
                      employees.map((emp, index) => (
                        <tr key={emp.id}>
                          <td>{index + 1}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.department}</td>
                          <td>₹ {emp.salary}</td>
                          <td>{emp.phone}</td>
                          <td>{emp.address}</td>
                          <td>
                            <button onClick={() => handleDelete(emp.id)} className="btn btn-danger ">
                              Delete
                            </button>{" "}
                            <button
                              className="btn btn-success"
                              onClick={() => handleEdit(emp)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-muted">
                          No Employees Found
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;