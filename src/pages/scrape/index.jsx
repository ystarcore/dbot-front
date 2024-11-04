import React from "react";
import { Table } from "antd";
import moment from "moment";

import { useFetchScrapesQuery } from "./scrape.service";

import { URI } from "../../app/app.config";

function Scrape() {
  const { data: scrapesData, error, isLoading } = useFetchScrapesQuery();

  const downloadFile = (record) => {
    const { _id } = record;

    const link = document.createElement("a");

    link.href = `${URI}/scrapes/${_id}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Scraped At",
      dataIndex: "scrapedAt",
      key: "scrapedAt",
      render: (data, record) => (
        <span
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => downloadFile(record)}
        >
          {data && moment(data).format("YYYY/MM/DD HH:mm")}
        </span>
      ),
    },
  ];

  // If needed, handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Table
        columns={columns}
        style={{ opacity: 0.8 }}
        dataSource={scrapesData?.scrapes || []}
        rowKey={(record) => record._id}
        pagination={false}
        bordered
        title={() => (
          <div style={{ width: "100%" }}>
            <h1 style={{}}>Scraped Data</h1>
          </div>
        )}
      />
    </div>
  );
}

export default Scrape;
