import axiosInstance from "./axiosInstance";

const BASE_URL = "http://localhost:3000";

// Axios based calls - used for list, add, update, delete
export const getEmployees = (params) => axiosInstance.get("/employee", { params });
export const getEmployeeByIdAxios = (id) => axiosInstance.get(`/employee/${id}`);
export const addEmployee = (data) => axiosInstance.post("/employee", data);
export const updateEmployee = (id, data) => axiosInstance.put(`/employee/${id}`, data);
export const deleteEmployee = (id) => axiosInstance.delete(`/employee/${id}`);

// Native fetch based call - used to get a single employee (demonstrates fetch alongside axios)
export const getEmployeeByIdFetch = (id) => {
    return fetch(`${BASE_URL}/employee/${id}`).then((res) => {
        if (!res.ok) {
            throw new Error("Employee not found");
        }
        return res.json();
    });
};
