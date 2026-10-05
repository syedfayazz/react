const Pagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(page - 1)}>Previous</button>
                </li>
                {pages.map((p) => (
                    <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(p)}>{p}</button>
                    </li>
                ))}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(page + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
