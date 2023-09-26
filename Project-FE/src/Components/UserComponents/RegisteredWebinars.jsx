import "../../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpcomingWebinarsUser() {
  const [webinarData, setWebinarData] = useState([]);

  async function pastwebinars() {
    const response = await fetch(
      "http://127.0.0.1:8090/api/v1/webinars/registeredWebinars",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setWebinarData(data.data.registeredWebinars);
  }
  useEffect(() => {
    pastwebinars();
  }, []);

  return (
    <div className="displayProducts">
      {webinarData.map((item) => (
        <Card item={item} key={item._id} />
      ))}
    </div>
  );
}

function Card({ item }) {
  const navigate = useNavigate();
  async function attend(id) {
    const response = await fetch(
      `http://127.0.0.1:8090/api/v1/webinars/attendWebinar/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status === "attended") {
      toast(data.message);
    } else if (data.status === "success") {
      toast(data.message);
      navigate("/joinWebinar/" + id);
    } else if (data.status === "past") {
      toast(data.message);
    } else if (data.status === "future") {
      toast(data.message);
    }
  }
  let sTime = new Date(item.startTime).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  let eTime = new Date(item.endTime).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  return (
    <div className="cardProduct">
      <MDBCard>
        <MDBCardImage src={item.image} position="top" alt={item.name} />
        <MDBCardBody>
          <MDBCardTitle>{item.name}</MDBCardTitle>
          <MDBCardText>{item.description}</MDBCardText>
          <MDBCardTitle href="#">
            Start Time:
            {sTime}
          </MDBCardTitle>
          <MDBCardTitle href="#">End Time{eTime}</MDBCardTitle>
        </MDBCardBody>
        <MDBBtn onClick={() => attend(item._id)}>ATTEND</MDBBtn>
      </MDBCard>
      <ToastContainer />
    </div>
  );
}

export default UpcomingWebinarsUser;
