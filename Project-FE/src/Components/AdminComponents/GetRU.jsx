import "../../App.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GetRU() {
  const [userData, setUserData] = useState([]);
  const params = useParams();
  async function getRegUsers() {
    const response = await fetch(
      `http://127.0.0.1:8090/api/v1/webinars/getRegisteredUsers/${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data.data.webinar.registeredUsers);
  }
  useEffect(() => {
    getRegUsers();
  }, []);

  return (
    <div className="displayUsers">
      <h3>
        {userData.map((item) => (
          <List item={item} key={item._id} />
        ))}
      </h3>
    </div>
  );
}

function List({ item }) {
  return (
    <div className="userLists">
      <h1>Name 👷‍♂️: {item.name}</h1>
      <h1>Email 📩:{item.email}</h1>
    </div>
  );
}

export default GetRU;
