import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployeeByIdFetch } from "../../api/employeeApi";

// Uses the native fetch API (see employeeApi.js) to demonstrate fetch alongside axios
const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setEmployee(null);
        setError(null);
        getEmployeeByIdFetch(id)
            .then((data) => setEmployee(data))
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) {
        return (
            <div className="container">
                <p className="text-danger">{error}</p>
                <Link className="btn btn-secondary" to={"/employee"}>Back to List</Link>
            </div>
        );
    }

    if (!employee) {
        return <div className="container"><p>Loading...</p></div>;
    }

    return (
        <div className="row">
            <div className="col-lg-6 offset-lg-3">
                <div className="card">
                    <div className="card-title">
                        <h2>Employee Details</h2>
                    </div>
                    <div className="card-body">
                        <p><strong>ID:</strong> {employee.id}</p>
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Mobile:</strong> {employee.mobile}</p>
                        <p><strong>Age:</strong> {employee.age}</p>
                        <p><strong>Salary:</strong> {employee.salary}</p>
                        <p><strong>Gender:</strong> {employee.gender}</p>
                        <p><strong>Department:</strong> {employee.department}</p>
                        <p><strong>Employment Type:</strong> {employee.employmentType}</p>
                        <p><strong>Skills:</strong> {(employee.skills || []).join(", ")}</p>
                        <p><strong>Status:</strong> {employee.isActive ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="card-footer">
                        <Link className="btn btn-primary" to={`/editemployee/${employee.id}`}>Edit</Link>
                        <Link className="btn btn-secondary" to={"/employee"}>Back to List</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
