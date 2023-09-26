import "../../App.css";
import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function UserDetails() {
  const [userData, setUserData] = useState([]);

  async function users() {
    const response = await fetch("http://127.0.0.1:8090/api/v1/auth/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserData(data.data.users);
  }
  useEffect(() => {
    users();
  }, []);

  return (
    <div className="displayUserss">
      {userData.map((item) => (
        <Card item={item} key={item._id} users={users} />
      ))}
    </div>
  );
}
Modal.setAppElement("#root");
function Card({ item, users }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function deleteuser(id, role) {
    if (role === "user") {
      const response = await fetch(`http://127.0.0.1:8090/api/v1/auth/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        toast("User deleted successfully");
      }
      users();
    } else {
      toast("Only User can be deleted here");
    }
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function updateUser(id) {
    console.log(id, name, email);
    const response = await fetch(`http://127.0.0.1:8090/api/v1/auth/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      toast("User updated successfully");
    }
    closeModal();
    users();
  }
  return (
    <div className="cardProduct">
      <MDBCard>
        <MDBCardImage
          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          position="top"
          alt={item.name}
        />
        <MDBCardBody>
          <MDBCardTitle>Name 🏷: {item.name}</MDBCardTitle>
          <MDBCardText>Email 📧:{item.email}</MDBCardText>
          <MDBCardText>Role 👔:{item.role}</MDBCardText>
          <div className="crudBtn">
            <button className="btn1" onClick={openModal}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              className="btn1"
              onClick={() => deleteuser(item._id, item.role)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
          <ToastContainer />
        </MDBCardBody>
      </MDBCard>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="btn1">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <form className="userform">
          <label htmlFor="wname">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={item.name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={item.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="webinarButton"
            type="button"
            onClick={() => updateUser(item._id)}
          >
            UPDATE USER
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default UserDetails;
