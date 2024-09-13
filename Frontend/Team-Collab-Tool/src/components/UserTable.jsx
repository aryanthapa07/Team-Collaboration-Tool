import {
  useFetchUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../services/UserViewApi";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmationDialog from "../shared/ConfirmationDialog";
import { toast, Toaster } from "react-hot-toast";

const UserTable = () => {
  const { data: users, error, isLoading, refetch } = useFetchUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [editingUser, setEditingUser] = useState(null);
  const [newData, setNewData] = useState({
    email: "",
    name: "",
    is_admin: false,
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const totalPages = Math.ceil((users?.length || 0) / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users?.slice(startIndex, startIndex + usersPerPage);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading users.</p>;

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewData({ email: user.email, name: user.name, is_admin: user.is_admin });
  };

  const handleSave = async () => {
    try {
      await updateUser({ id: editingUser.id, ...newData });
      setEditingUser(null);
      refetch();
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const openConfirmDialog = (user) => {
    setUserToDelete(user);
    setShowConfirmDialog(true);
  };

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      refetch();
    } catch (err) {
      console.error("Error deleting user", err);
    } finally {
      closeConfirmDialog();
      toast.success("User Deleted");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="tableContainer">
      <Toaster position="top-center" reverseOrder={false} />
      <table className="tableStyles">
        {/* Table column heading */}
        <thead className="bg-gray-200">
          <tr>
            <th className="tableHeading">S.No</th>
            <th className="tableHeading">Email</th>
            <th className="tableHeading">Name</th>
            <th className="tableHeading">Admin</th>
            <th className="tableHeading">Actions</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="tableBody">
          {paginatedUsers?.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="tableData">{startIndex + index + 1}</td>
              <td className="tableData">
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    value={newData.email}
                    onChange={(e) =>
                      setNewData({ ...newData, email: e.target.value })
                    }
                    className="tableDataInput"
                  />
                ) : (
                  <p className="truncate">{user.email}</p>
                )}
              </td>
              <td className="tableData">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={newData.name}
                    onChange={(e) =>
                      setNewData({ ...newData, name: e.target.value })
                    }
                    className="tableDataInput"
                  />
                ) : (
                  <p className="truncate">{user.name}</p>
                )}
              </td>
              <td className="tableData">
                {editingUser?.id === user.id ? (
                  <select
                    value={newData.is_admin}
                    onChange={(e) =>
                      setNewData({ ...newData, is_admin: e.target.value })
                    }
                    className="tableDataInput"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                ) : (
                  <p>{user.is_admin ? "Yes" : "No"}</p>
                )}
              </td>
              <td className="tableData">
                {editingUser?.id === user.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="text-green-500 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="text-red-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500 hover:underline"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => openConfirmDialog(user)}
                      className="text-red-500 hover:underline"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`bluebutton ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bluebutton ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>

      {/* Dialog to delete a user */}
      {showConfirmDialog && (
        <ConfirmationDialog
          message={`Are you sure you want to delete user ${userToDelete?.name}?`}
          onConfirm={confirmDelete}
          onCancel={closeConfirmDialog}
        />
      )}
    </div>
  );
};

export default UserTable;
