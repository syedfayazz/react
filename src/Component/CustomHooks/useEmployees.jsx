import { useCallback, useEffect, useState } from "react";
import { getEmployees } from "../../api/employeeApi";

// Centralized data fetching for employee list/cards views with pagination, sorting and filtering
const useEmployees = ({ page = 1, limit = 5, sortField = "id", sortOrder = "asc", search = "", department = "" }) => {
    const [employees, setEmployees] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadFlag, setReloadFlag] = useState(0);

    const refetch = useCallback(() => setReloadFlag((f) => f + 1), []);

    useEffect(() => {
        setLoading(true);
        const params = {
            _page: page,
            _limit: limit,
            _sort: sortField,
            _order: sortOrder,
        };
        if (search) params.q = search;
        if (department) params.department = department;

        getEmployees(params)
            .then((res) => {
                setEmployees(res.data);
                setTotalCount(Number(res.headers["x-total-count"]) || res.data.length);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [page, limit, sortField, sortOrder, search, department, reloadFlag]);

    return { employees, totalCount, loading, error, refetch };
};

export default useEmployees;
