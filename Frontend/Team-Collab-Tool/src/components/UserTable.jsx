import { useFetchUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from "../services/UserViewApi";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmationDialog from "../shared/ConfirmationDialog";

const UserTable = () => {
  const { data: users, error, isLoading, refetch } = useFetchUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [editingUser, setEditingUser] = useState(null);
  const [newData, setNewData] = useState({ email: '', name: '', is_admin: false });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Track which user to delete

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewData({ email: user.email, name: user.name, is_admin: user.is_admin });
  };

  const handleSave = async () => {
    try {
      await updateUser({ id: editingUser.id, ...newData });
      setEditingUser(null);
      refetch();  // Refetch the user data to reflect changes
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const openConfirmDialog = (user) => {
    setUserToDelete(user); // Set the user to delete
    setShowConfirmDialog(true); // Show the confirmation dialog
  };

  const closeConfirmDialog = () => {
    setShowConfirmDialog(false); // Close the confirmation dialog
    setUserToDelete(null); // Reset user to delete
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      refetch(); // Refetch the user data to reflect changes
    } catch (err) {
      console.error("Error deleting user", err);
    } finally {
      closeConfirmDialog(); // Close the confirmation dialog after deletion
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left border-b">ID</th>
            <th className="px-6 py-3 text-left border-b">Email</th>
            <th className="px-6 py-3 text-left border-b">Name</th>
            <th className="px-6 py-3 text-left border-b">Admin</th>
            <th className="px-6 py-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 border-b">{user.id}</td>
              <td className="px-6 py-4 border-b">
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    value={newData.email}
                    onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="px-6 py-4 border-b">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={newData.name}
                    onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="px-6 py-4 border-b">
                {editingUser?.id === user.id ? (
                  <select
                    value={newData.is_admin}
                    onChange={(e) => setNewData({ ...newData, is_admin: e.target.value })}
                    className="border px-2 py-1"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                ) : (
                  (user.is_admin ? "Yes" : "No")
                )}
              </td>
              <td className="px-6 py-4 border-b">
                {editingUser?.id === user.id ? (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="text-green-500">Save</button>
                    <button onClick={() => setEditingUser(null)} className="text-red-500">Cancel</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(user)} className="text-blue-500">
                      <AiOutlineEdit />
                    </button>
                    <button onClick={() => openConfirmDialog(user)} className="text-red-500">
                      <AiOutlineDelete />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
