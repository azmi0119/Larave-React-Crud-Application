import { useEffect, useState } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const getPaginationRange = (currentPage, lastPage, siblingCount = 1) => {
    const totalNumbers = siblingCount * 2 + 10;
    if (lastPage <= totalNumbers) {
        return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, lastPage);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < lastPage - 1;

    const range = [];
    range.push(1);
    if (showLeftDots) range.push("...");

    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== lastPage) range.push(i);
    }

    if (showRightDots) range.push("...");
    range.push(lastPage);

    return range;
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/users?page=${page}`);
            setUsers(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const pages = getPaginationRange(currentPage, lastPage);

    return (
        <div className="user-list-container">
            <h2 className="user-list-heading">User List</h2>

            <div className="user-table-wrapper">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="user-empty-state">
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="user-empty-state">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="user-action-cell">
                                            <EditUser user={user} fetchUsers={fetchUsers} />
                                            <DeleteUser id={user.id} fetchUsers={fetchUsers} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="user-pagination">
                <button
                    className="nav-button"
                    disabled={loading || currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                {pages.map((page, index) =>
                    page === "..." ? (
                        <span key={`dots-${index}`} className="page-dots">
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`page-button ${currentPage === page ? "active" : ""}`}
                            disabled={loading}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className="nav-button"
                    disabled={loading || currentPage === lastPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserList;