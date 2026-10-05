export const departmentOptions = ["HR", "IT", "Finance", "Sales", "Marketing"];

const EmployeeFilterBar = ({ search, onSearchChange, department, onDepartmentChange, sortField, sortOrder, onSortChange }) => {
    return (
        <div className="row mb-3 g-2 align-items-center">
            <div className="col-lg-4">
                <input
                    className="form-control"
                    placeholder="Search by name/email..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="col-lg-4">
                <select className="form-control" value={department} onChange={(e) => onDepartmentChange(e.target.value)}>
                    <option value="">All Departments</option>
                    {departmentOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>
            <div className="col-lg-4">
                <select
                    className="form-control"
                    value={`${sortField}:${sortOrder}`}
                    onChange={(e) => {
                        const [field, order] = e.target.value.split(":");
                        onSortChange(field, order);
                    }}
                >
                    <option value="id:asc">Sort: ID (Asc)</option>
                    <option value="id:desc">Sort: ID (Desc)</option>
                    <option value="name:asc">Sort: Name (A-Z)</option>
                    <option value="name:desc">Sort: Name (Z-A)</option>
                    <option value="salary:asc">Sort: Salary (Low-High)</option>
                    <option value="salary:desc">Sort: Salary (High-Low)</option>
                    <option value="age:asc">Sort: Age (Low-High)</option>
                    <option value="age:desc">Sort: Age (High-Low)</option>
                </select>
            </div>
        </div>
    );
};

export default EmployeeFilterBar;
