import { useState } from "react";

function EmployeeListing() {
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
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

    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    //   const [employees, setEmployees] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:3000/employees")
    //         .then((response) => response.json())
    //         .then((data) => setEmployees(data))
    //         .catch((err) => console.log(err));
    // }, []);

    //   const filteredEmployees = employees.filter((emp) =>
    //     emp.name.toLowerCase().includes(search.toLowerCase())
    //   );


    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.age.toString().includes(search) ||
        emp.education.toLowerCase().includes(search.toLowerCase()) ||
        emp.gender.toLowerCase().includes(search.toLowerCase()) ||
        emp.interests.join(", ").toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="container">
            <h2>Employee Listing</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                /></div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Education</th>
                        <th>Gender</th>
                        <th>Interests</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredEmployees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.age}</td>
                            <td>{emp.education}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.interests.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={prevPage}
                disabled={page === 0}
            >
                Previous
            </button>

            <span>
                Page {page + 1}
            </span>

            <button
                onClick={nextPage}
                disabled={page === totalPages - 1}
            >
                Next
            </button>
        </div>
    );
}

export default EmployeeListing;
