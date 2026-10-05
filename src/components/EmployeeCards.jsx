import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeCards() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const employees = [
        {
            id: 1,
            name: "Fayaz",
            age: 30,
            education: "Bachelor Degree",
            gender: "Male",
            interests: ["Java", "Python"]
        },
        {
            id: 2,
            name: "Rahul",
            age: 28,
            education: "Master Degree",
            gender: "Male",
            interests: ["C++", "Java"]
        },
        {
            id: 3,
            name: "Priya",
            age: 25,
            education: "Diploma",
            gender: "Female",
            interests: ["Python"]
        }
    ];

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.age.toString().includes(search) ||
        emp.education.toLowerCase().includes(search.toLowerCase()) ||
        emp.gender.toLowerCase().includes(search.toLowerCase()) ||
        emp.interests.join(", ").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h2>Employee Cards</h2>
            <div className="search-container">
                <button className="list-btn" onClick={() => navigate("/employees")}>
                    Table View
                </button>
                <input
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="employee-card-grid">
                {filteredEmployees.map((emp) => (
                    <div className="employee-card" key={emp.id}>
                        <h3>{emp.name}</h3>
                        <p><strong>Age:</strong> {emp.age}</p>
                        <p><strong>Education:</strong> {emp.education}</p>
                        <p><strong>Gender:</strong> {emp.gender}</p>
                        <p><strong>Interests:</strong> {emp.interests.join(", ")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeCards;
