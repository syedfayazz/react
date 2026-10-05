import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useEmployees from "../CustomHooks/useEmployees";
import { deleteEmployee } from "../../api/employeeApi";
import EmployeeFilterBar from "./EmployeeFilterBar";
import Pagination from "./Pagination";

const LIMIT = 5;

const Employeelisting = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    const { employees, totalCount, loading, error, refetch } = useEmployees({
        page, limit: LIMIT, sortField, sortOrder, search, department
    });

    const totalPages = Math.ceil(totalCount / LIMIT) || 1;

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

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

    const sortIcon = (field) => (sortField === field ? (sortOrder === "asc" ? " \u25B2" : " \u25BC") : "");

    return (
        <div className="container">
            <div className="card" >
                <div className="card-header">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                           <Link className="btn btn-primary" to={'/addemployee'}>Add Employee</Link>
                        </div>
                        <div className="col-lg-6">
                            <h3>Employee Listing</h3>
                        </div>
                        <div className="col-lg-3 text-end">
                            <Link className="btn btn-outline-secondary" to={'/employeecards'}>Card View</Link>
                        </div>
                    </div>

                </div>
                <div className="card-body">
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
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark text-white">
                                <tr>
                                    <td role="button" onClick={() => handleSort("id")}>ID{sortIcon("id")}</td>
                                    <td role="button" onClick={() => handleSort("name")}>Name{sortIcon("name")}</td>
                                    <td>Email</td>
                                    <td>Phone</td>
                                    <td role="button" onClick={() => handleSort("age")}>Age{sortIcon("age")}</td>
                                    <td role="button" onClick={() => handleSort("salary")}>Salary{sortIcon("salary")}</td>
                                    <td>Department</td>
                                    <td>Gender</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.length === 0 && (
                                        <tr><td colSpan="9" className="text-center">No employees found</td></tr>
                                    )
                                }
                                {
                                    employees.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.age}</td>
                                            <td>{item.salary}</td>
                                            <td>{item.department}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                                <Link className="btn btn-info btn-sm me-1" to={`/employee/view/${item.id}`}>View</Link>
                                                <Link className="btn btn-primary btn-sm me-1" to={`/editemployee/${item.id}`}>Edit</Link>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    )}

                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </div>

            </div>

        </div>
    );
}

export default Employeelisting;