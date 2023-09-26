import "../../App.css";
import React, { useEffect, useState } from "react";
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

  async function upcomingwebinars() {
    const response = await fetch(
      "http://127.0.0.1:8090/api/v1/webinars/getupcommingwebinars",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data.data.webinar);
    setWebinarData(data.data.webinar);
  }
  useEffect(() => {
    upcomingwebinars();
  }, []);

  return (
    <div className="displayProducts">
      {webinarData.map((item) => (
        <Card item={item} key={item._id} />
      ))}
    </div>
  );
}

async function register(id) {
  const response = await fetch(
    `http://127.0.0.1:8090/api/v1/webinars/registerWebinar/${id}`,
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
  if (data.status === "success") {
    toast(data.message);
  } else if (data.status === "registered") {
    toast(data.message);
  }
}

function Card({ item }) {
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
          <MDBCardTitle href="#">Start Time:{sTime}</MDBCardTitle>
          <MDBCardTitle href="#">End Time:{eTime}</MDBCardTitle>
        </MDBCardBody>
        <MDBBtn onClick={() => register(item._id)}>REGISTER</MDBBtn>
      </MDBCard>
      <ToastContainer />
    </div>
  );
}

export default UpcomingWebinarsUser;
