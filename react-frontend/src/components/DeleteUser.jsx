import axios from "axios";

const DeleteUser = ({ id, fetchUsers }) => {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/users/${id}`
            );
            alert("Deleted Successfully");
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
    );

};

export default DeleteUser;