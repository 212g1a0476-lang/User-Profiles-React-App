import React from "react";
import { Card, Avatar, Button } from "antd";
import { EditOutlined, DeleteOutlined, HeartOutlined } from "@ant-design/icons";

const UserCard = ({ user, onEdit, onDelete, onLike }) => {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${encodeURIComponent(
    user.username
  )}.svg?options[mood][]=happy`;

  return (
    <Card
      hoverable
      style={{ width: "100%", height: "100%" }}
      actions={[
        <Button type="text" onClick={onLike} icon={<HeartOutlined />}>
          {user.liked ? "Unlike" : "Like"}
        </Button>,
        <Button type="text" onClick={onEdit} icon={<EditOutlined />}>
          Edit
        </Button>,
        <Button type="text" danger onClick={onDelete} icon={<DeleteOutlined />}>
          Delete
        </Button>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={avatarUrl} size={64} />}
        title={user.name}
        description={
          <div>
            <div style={{ marginBottom: 8 }}>@{user.username}</div>
            <div>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${user.phone}`}>{user.phone}</a>
            </div>
            <div>
              <strong>Company:</strong> {user.company?.name}
            </div>
            <div>
              <strong>City:</strong> {user.address?.city}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default UserCard;
