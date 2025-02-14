import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetEditUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "./userSlice";

const FormComponent = ({ onFormSubmit, editUser, btnClass }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    organisation: "",
    salary: "",
    statmentUpload: "",
    multipleUpload: "",
    reportingManager: "",
    salaryCredit: "",
    jobMode:"",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    }
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return; // Allow only numbers
      if (value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "statmentUpload") {
      setFormData({ ...formData, [name]: files[0] }); // store the uploaded file
      // console.log(e.target.files[0]);
    } else if (name === "multipleUpload") {
      setFormData({ ...formData, [name]: Array.from(files) });
      // console.log(Array.from(files));
      // Store the array of uploaded files
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.organisation)
      newErrors.organisation = "Organisation is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
    if (!formData.jobMode) newErrors.salary = "JobMode is required";
    if (!formData.reportingManager)
      newErrors.reportingManager = "Reporting Manager is required";
    // if (!formData.statmentUpload) newErrors.statmentUpload = "Statment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = { ...formData, id: editUser ? editUser.id : Date.now() };
      onFormSubmit(newUser);
      navigate("/UserTable"); // Navigate to UserTable
      setFormData({
        name: "",
        email: "",
        mobile: "",
        organisation: "",
        salary: "",
        statmentUpload: "",
        multipleUpload: "",
        reportingManager: "",
        salaryCredit: "",
        jobMode:"",
      });
      setErrors({});
      dispatch(resetEditUser()); // Reset the edit user state in Redux
    }
  };

  return (
    <>
      <h1 className="text-primary d-flex justify-content-center">
        Welcome To Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-light"
        enctype="multipart/form-data"
      >
        {/* Input fields and validation messages */}
        {/* Name Field */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Mobile Field */}
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="number"
            id="mobile"
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            name="mobile"
            maxLength={10}
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && (
            <div className="invalid-feedback">{errors.mobile}</div>
          )}
        </div>

        {/* Organisation Dropdown */}
        <div className="form-group">
          <label>Organisational Group:</label>
          <select
            className={`form-control ${
              errors.organisation ? "is-invalid" : ""
            }`}
            id="organisation"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Santion & Credit">Santion & Credit</option>
            <option value="Account">Account</option>
            <option value="Audit">Audit</option>
            <option value="Closing">Closing</option>
            <option value="Collection">Collection</option>
          </select>
          {errors.organisation && (
            <div className="invalid-feedback">{errors.organisation}</div>
          )}
        </div>

        {/* Salary Field */}
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            id="salary"
            className={`form-control ${errors.salary ? "is-invalid" : ""}`}
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          {errors.salary && (
            <div className="invalid-feedback">{errors.salary}</div>
          )}
        </div>

        {/* Single Statmet Upload*/}
        <div className="form-group">
          <label className="pr-2">Upload Single Statment: </label>
          <input
            type="file"
            name="statmentUpload"
            onChange={handleChange}
            accept="image/png, image/jpg, image/jpeg"

            // className={`${errors.statmentUpload ? "is-invalid" : ""}`}
          />
          {/* {errors.statmentUpload && (
            <div className="invalid-feedback">{errors.statmentUpload}</div>
          )} */}
        </div>

        {/* Multiple Statment Upload*/}
        <div className="form-group">
          <label className="pr-2">Upload Multiple Statment: </label>
          <input
            type="file"
            name="multipleUpload"
            onChange={handleChange}
            multiple
            // className={`${errors.statmentUpload ? "is-invalid" : ""}`}
          />
          {/* {errors.statmentUpload && (
            <div className="invalid-feedback">{errors.statmentUpload}</div>
          )} */}
        </div>

        {/* Reporting Manager Dropdown */}
        <div className="form-group">
          <label>Reporting Manager:</label>
          <select
            className={`form-control ${
              errors.reportingManager ? "is-invalid" : ""
            }`}
            name="reportingManager"
            value={formData.reportingManager}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Akash">Akash</option>
            <option value="Pravin">Pravin</option>
          </select>
          {errors.reportingManager && (
            <div className="invalid-feedback">{errors.reportingManager}</div>
          )}
        </div>

        {/* Salary Credit Radio Buttons */}
        <div className="form-group">
          <label>Salary Credit:</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="account"
              value="account"
              name="salaryCredit"
              checked={formData.salaryCredit === "account"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="account">
              Account
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="cash"
              value="cash"
              name="salaryCredit"
              checked={formData.salaryCredit === "cash"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="cash">
              Cash
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="cheque"
              value="cheque"
              name="salaryCredit"
              checked={formData.salaryCredit === "cheque"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="cheque">
              Cheque
            </label>
          </div>
        </div>

        {/* Job Mode checkbox */}
        <div className="form-group">
          <label>Job Mode:</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="WFH"
              value="WFH"
              name="jobMode"
              // checked={formData.jobMode === "WFH"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="WFH">
              WFH
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="WFO"
              value="WFO"
              name="jobMode"
              // checked={formData.jobMode === "WFO"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="WFO">
            WFO
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="Remote"
              value="Remote"
              name="jobMode"
              // checked={formData.jobMode === "Remote"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="Remote">
            Remote
            </label>
          </div>
        </div>

        <button type="submit" className={`btn ${btnClass}`}>
          {editUser ? "Update User" : "Add User"}
        </button>
      </form>
    </>
  );
};

export default FormComponent;
