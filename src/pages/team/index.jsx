import React, { useState, useEffect } from "react";
import moment from "moment";

import { Table, Input, Button, Popconfirm, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import {
  useFetchTeamsQuery,
  useCreateTeamMutation,
  useEditTeamMutation,
  useRemoveTeamMutation,
  useCreateClientMutation,
} from "./team.service";

import { URI } from "../../app/app.config";

const Team = () => {
  const { data: teamData = { teams: [] } } = useFetchTeamsQuery();
  const [createTeam, { isSuccess: isSuccessCreateTeam }] =
    useCreateTeamMutation();
  const [editTeam, { isSuccess: isSuccessEditTeam }] = useEditTeamMutation();
  const [removeTeam] = useRemoveTeamMutation();
  const [createClient, { isSuccess: isSuccessCreateClien }] =
    useCreateClientMutation();

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [fileList, setFileList] = useState({});

  useEffect(() => {
    setData(teamData.teams);
  }, [teamData]);

  const isEditing = (record) => record._id === editingId;

  const edit = (record) => {
    setEditingId(record._id);

    setEditedName(record.name);
  };

  const cancel = () => {
    if (editingId === "new") setData(data.filter((item) => item._id !== "new"));

    setEditingId("");
  };

  const save = async () => {
    try {
      if (editingId === "new") await createTeam({ name: editedName });
      else await editTeam({ id: editingId, data: { name: editedName } });

      setEditingId("");
      setEditedName("");

      if (isSuccessCreateTeam) message.success("Team create successfully");
      else if (isSuccessEditTeam) message.success("Team update successfully");
      else
        message.error(
          "Failed to create team. Please try it after logout/login"
        );
    } catch (err) {
      message.error(`Failed: ${err?.data?.error?.message}`);
    }
  };

  const deleteRecord = (id) => {
    removeTeam(id)
      .then(() => message.success("Team deleted successfully"))
      .catch((_) => message.error("Error deleting team"));
  };

  const createNewRow = () => {
    const newEntry = {
      _id: "new",
      name: "",
    };

    setData([newEntry, ...data]);
    setEditedName("");
    setEditingId("new");
  };

  const handleUploadChange = (id, { fileList: tmpList, file }) => {
    let arr = [...tmpList];

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      arr = [];
      message.error("You can only upload .xlsx files!");
    }

    const tmp = { ...fileList, [id]: arr };

    setFileList({ ...tmp });
  };

  const uploadClient = async (id) => {
    const formData = new FormData();

    formData.append("file", fileList[id][0].originFileObj);

    try {
      await createClient({ id, formData });

      const tmp = { ...fileList, [id]: [] };

      setFileList({ ...tmp });

      if (isSuccessCreateClien)
        message.success("Client file update successfully");
      else
        message.error(
          "Failed to upload client. Please try it after logout/login"
        );
    } catch (error) {
      message.error("Failed to upload client");
    }
  };

  const downloadFile = (record) => {
    const { clientId } = record;

    const link = document.createElement("a");

    link.href = `${URI}/clients/${clientId}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "Team Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
      render: (text, record) => {
        return isEditing(record) ? (
          <Input
            autoFocus={true}
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      width: "25%",
      render: (data, record) => (
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => downloadFile(record)}
        >
          {data && moment(data).format("YYYY/MM/DD - HH:mm")}
        </span>
      ),
    },
    {
      title: "Upload Client Xlsx",
      dataIndex: "client",
      width: "25%",
      render: (_, record) => (
        <div>
          <span>
            <Upload
              fileList={fileList[record._id]}
              onChange={(info) => handleUploadChange(record._id, info)}
              beforeUpload={() => false}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </span>
          <span>
            <Button
              onClick={() => uploadClient(record._id)}
              disabled={!fileList[record._id]?.length}
              style={{ marginTop: 8 }}
            >
              Upload Client
            </Button>
          </span>
        </div>
      ),
    },
    {
      title: "Edit / Delete",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record._id)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button
              disabled={editingId !== ""}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteRecord(record._id)}
            >
              <Button>Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "100px 40px", opacity: 0.9 }}>
      <Table
        components={{
          body: {
            cell: (props) => <td {...props} />,
          },
        }}
        title={() => (
          <div style={{ width: "100%" }}>
            <Button
              type="primary"
              onClick={createNewRow}
              disabled={editingId !== ""}
              style={{ float: "right" }}
            >
              New Team
            </Button>
            <h1>Team Management</h1>
          </div>
        )}
        bordered
        dataSource={data.map((item) => ({ ...item, key: item._id }))}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
      />
    </div>
  );
};

export default Team;
