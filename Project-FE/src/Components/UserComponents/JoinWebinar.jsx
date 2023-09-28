import "../../App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

function JoinWebinar() {
  const [webinarData, setWebinarData] = useState([]);

  const params = useParams();
  async function getwebinar() {
    const response = await fetch(
      `http://127.0.0.1:8090/api/v1/webinars/watchwebinar/${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status === "over") {
      setWebinarData(data);
    }
    if (data.status === "success") {
      setWebinarData(data.data.webinar);
    }
  }
  useEffect(() => {
    getwebinar();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3>
        {webinarData.status === "over" ? (
          <p>Webinar has ended</p>
        ) : (
          <DuringWebinar webinarData={webinarData} />
        )}
      </h3>
    </div>
  );
}
function DuringWebinar({ webinarData }) {
  return (
    <div className="displayWebinar">
      <ReactPlayer
        url={webinarData.video}
        playing={true}
        controls={true}
        height="600px"
        width="100%"
      />
      <h2>Webinar Title: {webinarData.name}</h2>
      <p>Webinar Description: {webinarData.description}</p>
    </div>
  );
}

export default JoinWebinar;
