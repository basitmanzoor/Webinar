import "../../App.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateWebinar() {
  const [sdate, setSdate] = useState(new Date());
  const [edate, setEdate] = useState(new Date());
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");

  //add Webinar
  const addWebinar = async () => {
    const response = await fetch(
      "http://127.0.0.1:8090/api/v1/webinars/createWebinar",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          video,
          description,
          startTime: sdate,
          endTime: edate,
          image,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      toast("Webinar successfully added");
    } else {
      toast(data.message);
    }
  };
  return (
    <div>
      <form className="addWebinar">
        <label htmlFor="wname">Webinar Name:</label>
        <input
          type="text"
          id="wname"
          name="wname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="wname">Webinar Image:</label>
        <input
          type="text"
          id="iname"
          name="iname"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="wVideo">Webinar Video:</label>
        <input
          type="text"
          id="wVideo"
          name="wVideo"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />
        <label htmlFor="desc">Webinar Description:</label>
        <textarea
          id="desc"
          name="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="stime">Webinar Start Time:</label>
        <DatePicker
          showTimeSelect
          dateFormat="yyyy MMM d h:mmaa"
          minTime={new Date(0, 0, 0, 12, 30)}
          maxTime={new Date(0, 0, 0, 19, 0)}
          selected={sdate}
          onChange={(sdate) => setSdate(sdate)}
        />
        <label htmlFor="etime">Webinar End Time:</label>
        <DatePicker
          showTimeSelect
          dateFormat="yyyy MMM d h:mmaa"
          minTime={new Date(0, 0, 0, 12, 30)}
          maxTime={new Date(0, 0, 0, 19, 0)}
          selected={edate}
          onChange={(edate) => setEdate(edate)}
        />
        <button className="webinarButton" type="button" onClick={addWebinar}>
          CREATE
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default CreateWebinar;
