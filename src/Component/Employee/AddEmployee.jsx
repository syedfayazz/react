import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addEmployee, getEmployeeByIdAxios, updateEmployee } from "../../api/employeeApi";
import { departmentOptions } from "./EmployeeFilterBar";

const skillOptions = ["JavaScript", "React", "Node.js", "SQL", "Python"];
const genderOptions = ["Male", "Female", "Other"];
const employmentTypeOptions = ["Full-time", "Part-time", "Contract"];

const initialValues = {
    name: "",
    email: "",
    mobile: "",
    age: "",
    salary: "",
    gender: "Male",
    department: "",
    employmentType: "Full-time",
    skills: [],
    isActive: true,
};

const Addemployee = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();
    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current?.focus();
        if (id) {
            getEmployeeByIdAxios(id)
                .then((res) => {
                    setFormValues((prev) => ({ ...prev, ...res.data, skills: res.data.skills || [] }));
                })
                .catch((err) => {
                    toast.error("Failed to load employee details: " + err.message);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        if (type === "checkbox" && name === "skills") {
            setFormValues((prev) => {
                const skills = prev.skills.includes(value)
                    ? prev.skills.filter((s) => s !== value)
                    : [...prev.skills, value];
                return { ...prev, skills };
            });
        } else if (type === "checkbox") {
            setFormValues((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormValues((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobileRegex = /^[6-9]\d{9}$/;

        if (!values.name) errors.name = "Name is required!";

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        if (!values.mobile) {
            errors.mobile = "Mobile is required!";
        } else if (!mobileRegex.test(values.mobile)) {
            errors.mobile = "This is not a valid mobile number!";
        }

        if (!values.age) {
            errors.age = "Age is required!";
        } else if (values.age <= 0) {
            errors.age = "Age must be greater than 0!";
        }

        if (!values.salary) {
            errors.salary = "Salary is required!";
        } else if (values.salary <= 0) {
            errors.salary = "Salary must be greater than 0!";
        }

        if (!values.department) errors.department = "Department is required!";
        if (!values.skills || values.skills.length === 0) errors.skills = "Select at least one skill!";

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const request = id ? updateEmployee(id, formValues) : addEmployee(formValues);

        request
            .then(() => {
                toast.success(id ? "Employee updated successfully." : "Employee saved successfully.");
                navigate("/employee");
            })
            .catch((err) => {
                toast.error("Operation failed: " + err.message);
            });
    };

    return (
        <div className="row">
            <div className="col-lg-8 offset-lg-2">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-title">
                            <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-lg-6">
                                    <label>Name</label>
                                    <input ref={nameRef} name="name" value={formValues.name} onChange={handleChange} type="text" className="form-control" />
                                    <p className="text-danger">{formErrors.name}</p>
                                </div>

                                <div className="form-group col-lg-6">
                                    <label>Email</label>
                                    <input name="email" value={formValues.email} onChange={handleChange} type="text" className="form-control" />
                                    <p className="text-danger">{formErrors.email}</p>
                                </div>

                                <div className="form-group col-lg-6">
                                    <label>Mobile</label>
                                    <input name="mobile" value={formValues.mobile} onChange={handleChange} type="text" className="form-control" />
                                    <p className="text-danger">{formErrors.mobile}</p>
                                </div>

                                <div className="form-group col-lg-3">
                                    <label>Age</label>
                                    <input name="age" value={formValues.age} onChange={handleChange} type="number" className="form-control" />
                                    <p className="text-danger">{formErrors.age}</p>
                                </div>

                                <div className="form-group col-lg-3">
                                    <label>Salary</label>
                                    <input name="salary" value={formValues.salary} onChange={handleChange} type="number" className="form-control" />
                                    <p className="text-danger">{formErrors.salary}</p>
                                </div>

                                <div className="form-group col-lg-6">
                                    <label className="d-block">Gender</label>
                                    {genderOptions.map((g) => (
                                        <div className="form-check form-check-inline" key={g}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id={`gender-${g}`}
                                                value={g}
                                                checked={formValues.gender === g}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor={`gender-${g}`}>{g}</label>
                                        </div>
                                    ))}
                                </div>

                                <div className="form-group col-lg-6">
                                    <label>Department</label>
                                    <select name="department" value={formValues.department} onChange={handleChange} className="form-control">
                                        <option value="">Select Department</option>
                                        {departmentOptions.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    <p className="text-danger">{formErrors.department}</p>
                                </div>

                                <div className="form-group col-lg-12">
                                    <label className="d-block">Employment Type</label>
                                    {employmentTypeOptions.map((t) => (
                                        <div className="form-check form-check-inline" key={t}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="employmentType"
                                                id={`type-${t}`}
                                                value={t}
                                                checked={formValues.employmentType === t}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor={`type-${t}`}>{t}</label>
                                        </div>
                                    ))}
                                </div>

                                <div className="form-group col-lg-12">
                                    <label className="d-block">Skills</label>
                                    {skillOptions.map((s) => (
                                        <div className="form-check form-check-inline" key={s}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="skills"
                                                id={`skill-${s}`}
                                                value={s}
                                                checked={formValues.skills.includes(s)}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor={`skill-${s}`}>{s}</label>
                                        </div>
                                    ))}
                                    <p className="text-danger">{formErrors.skills}</p>
                                </div>

                                <div className="form-group col-lg-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="isActive"
                                            id="isActive"
                                            checked={formValues.isActive}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="isActive">Is Active</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">{id ? "Update" : "Save"}</button>
                            <Link className="btn btn-danger" to={"/employee"}>Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addemployee;