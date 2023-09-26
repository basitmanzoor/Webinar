import "../../App.css";
import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

function AttendedWebinars() {
  const [webinarData, setWebinarData] = useState([]);

  async function attendedwebinars() {
    const response = await fetch(
      "http://127.0.0.1:8090/api/v1/webinars/getattendedWebinars",
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
    setWebinarData(data.data.attendedWebinars);
    // setWebinarData(data.data.webinar);
  }
  useEffect(() => {
    attendedwebinars();
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
  let sTime = new Date(item.startTime).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  let eTime = new Date(item.endTime).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  return (
    <div className="cardProduct">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{item.name}</MDBCardTitle>
          <MDBCardText>{item.description}</MDBCardText>
          <MDBCardTitle href="#">Start Time:{sTime}</MDBCardTitle>
          <MDBCardTitle href="#">End Time{eTime}</MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default AttendedWebinars;
