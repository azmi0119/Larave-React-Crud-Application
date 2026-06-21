import { useState } from "react";
import axios from "axios";

const EditUser = ({ user, fetchUsers }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/users/${user.id}`,
                { name, email }
            );
            alert("User Updated Successfully");
            fetchUsers();
            const modal = bootstrap.Modal.getInstance(
                document.getElementById(`editModal${user.id}`)
            );
            modal.hide();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#editModal${user.id}`}> Edit </button>
            <div className="modal fade" id={`editModal${user.id}`} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal"> Close </button>
                            <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditUser;