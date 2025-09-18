import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, message } from "antd";
import UserCard from "./components/UserCard";
import EditUserModal from "./components/EditUserModal";
import Loader from "./components/Loader";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch users
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const usersWithLikes = res.data.map((user) => ({
          ...user,
          liked: false,
        }));
        setUsers(usersWithLikes);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to fetch users.");
        setLoading(false);
      });
  }, []);

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  // Delete user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    message.success("User deleted successfully");
  };

  // Like/Unlike
  const handleLike = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, liked: !user.liked } : user
      )
    );
  };

  // Cancel modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  // Save updated user
  const handleSave = (values) => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: values.name,
              email: values.email,
              phone: values.phone,
              company: { ...user.company, name: values.company },
              address: { ...user.address, city: values.city },
            }
          : user
      )
    );
    setIsModalVisible(false);
    setEditingUser(null);
    message.success("User updated successfully");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        User Profiles
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <Row gutter={[16, 16]}>
          {users.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
              <UserCard
                user={user}
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user.id)}
                onLike={() => handleLike(user.id)}
              />
            </Col>
          ))}
        </Row>
      )}

      <EditUserModal
        visible={isModalVisible}
        user={editingUser}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
};

export default App;


