import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useEmployees from "../CustomHooks/useEmployees";
import { deleteEmployee } from "../../api/employeeApi";
import EmployeeFilterBar from "./EmployeeFilterBar";
import Pagination from "./Pagination";

const LIMIT = 6;

const EmployeeCards = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    const { employees, totalCount, loading, error, refetch } = useEmployees({
        page, limit: LIMIT, sortField, sortOrder, search, department
    });

    const totalPages = Math.ceil(totalCount / LIMIT) || 1;

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        deleteEmployee(id)
            .then(() => {
                toast.success("Employee deleted successfully.");
                refetch();
            })
            .catch((err) => {
                toast.error("Delete failed: " + err.message);
            });
    };

    return (
        <div className="container">
            <div className="row align-items-center mb-3">
                <div className="col-lg-3">
                    <Link className="btn btn-primary" to={'/addemployee'}>Add Employee</Link>
                </div>
                <div className="col-lg-6">
                    <h3>Employee Cards</h3>
                </div>
                <div className="col-lg-3 text-end">
                    <Link className="btn btn-outline-secondary" to={'/employee'}>Table View</Link>
                </div>
            </div>

            <EmployeeFilterBar
                search={search}
                onSearchChange={(v) => { setSearch(v); setPage(1); }}
                department={department}
                onDepartmentChange={(v) => { setDepartment(v); setPage(1); }}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={(field, order) => { setSortField(field); setSortOrder(order); }}
            />

            {error && <p className="text-danger">{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row">
                    {employees.length === 0 && <p className="text-center">No employees found</p>}
                    {employees.map((item) => (
                        <div className="col-lg-4 mb-3" key={item.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{item.department}</h6>
                                    <p className="card-text mb-1">Email: {item.email}</p>
                                    <p className="card-text mb-1">Mobile: {item.mobile}</p>
                                    <p className="card-text mb-1">Age: {item.age}</p>
                                    <p className="card-text mb-1">Salary: {item.salary}</p>
                                    <p className="card-text mb-1">Gender: {item.gender}</p>
                                    <p className="card-text mb-1">Employment: {item.employmentType}</p>
                                    <p className="card-text mb-1">Skills: {(item.skills || []).join(", ")}</p>
                                    <span className={`badge ${item.isActive ? "bg-success" : "bg-secondary"}`}>
                                        {item.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link className="btn btn-info btn-sm" to={`/employee/view/${item.id}`}>View</Link>
                                    <Link className="btn btn-primary btn-sm" to={`/editemployee/${item.id}`}>Edit</Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

export default EmployeeCards;
