import "../../App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

function JoinWebinar() {
  const [webinarData, setWebinarData] = useState([]);
  const [webinarEnded, setWebinarEnded] = useState(false);
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
      setWebinarEnded(true);
    }
    if (data.status === "success") {
      setWebinarData(data.data.webinar);
    }
  }
  useEffect(() => {
    getwebinar();

    // Check the current time periodically
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const endTime = new Date(webinarData.endTime).getTime(); // Assuming webinarData.endTime is a valid date string

      if (currentTime >= endTime) {
        setWebinarEnded(true);
        clearInterval(interval); // Stop checking when the webinar ends
      }
    }, 1000); // Check every second

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [webinarData.endTime]);

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
