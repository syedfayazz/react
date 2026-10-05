import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function AddEmployee() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((item) => item !== value));
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const employeeObject = {
      name,
      age,
      education,
      gender,
      interests
    };

    console.log(employeeObject);
    alert("Submitted Successfully");

    try {
      const response = await fetch(
        "http://localhost:3000/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(employeeObject)
        }
      );

      if (response.ok) {
        alert("Employee Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="card">
          <div className="card-title">
            <h2>Add Employee</h2>
            <button
              className="list-btn"
              onClick={() => navigate("/employees")}
            >
              Employee List
            </button>
          </div>

          <div className="card-body">
            <form className='form-group' onSubmit={formSubmit}>

              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input-class"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />

              {/* Age */}
              <label className="label">Age</label>
              <input
                type="number"
                className="input-class"
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
              />

              {/* Education Dropdown */}
              <label className="label">Education</label>
              <select
                className="input-class"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="" className="input-class">Select Education</option>
                <option value="Bachelor Degree">Bachelor Degree</option>
                <option value="Master Degree">Master Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="+12">+12</option>
              </select>

              {/* Gender Radio Buttons */}
              <label className="label">Gender</label>
              <div className="label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                />
                Male

                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </div>

              {/* Interests Checkboxes */}
              <label className="label">Interests</label>

              <div className="label">
                <input
                  type="checkbox"
                  value="Java"
                  onChange={handleInterestChange}
                />
                Java

                <input
                  type="checkbox"
                  value="C++"
                  onChange={handleInterestChange}
                />
                C++

                <input
                  type="checkbox"
                  value="Python"
                  onChange={handleInterestChange}
                />
                Python
              </div>

              <br />

              <input type="submit" className='submit-btn' value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
