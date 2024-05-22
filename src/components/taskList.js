import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../redux/taskSlice";
import { taskData } from "../data/taskData";
import Items from "./items";
import validateEmail from "./email";
import "../App.css";

const TaskList = ({ propCurrentItems }) => {
  const [userInput, setUserInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [list, setList] = useState(taskData);
  const [addModal, showAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const dispatch = useDispatch();
  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput !== "") {
      const newItem = {
        id: Math.random(),
        value: userInput,
        email: userEmail,
        role: userRole,
      };
      dispatch(addUser(newItem));
      setList([...list, newItem]);
      setUserInput("");
      setUserEmail("");
      setUserRole("");
      showAddModal(false);
    }
  };

  const deleteItem = (key) => {
    dispatch(deleteUser(key));
  };

  const handleAdd = () => {
    showAddModal(true);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    // setIsValidEmail(validateEmail(email)); // Check if the entered email is valid
  };

  const handleEdit = (index) => {
    setEditedIndex(index);
    setUserInput(propCurrentItems[index].title);
    setUserEmail(propCurrentItems[index].description);
    setUserRole(propCurrentItems[index].priority);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedItem = {
      id: propCurrentItems[editedIndex].id,
      value: userInput || propCurrentItems[editedIndex].title,
      email: userEmail || propCurrentItems[editedIndex].description,
      role: userRole || propCurrentItems[editedIndex].priority,
    };
    dispatch(updateUser(updatedItem));
    setUserInput("");
    setUserEmail("");
    setUserRole("");
    setShowModal(false);
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        Task Manager
      </Row>

      <hr />
      <Row>
        <Col>
          <Button
            variant="dark"
            className="mt-2 mb-4 add-user"
            onClick={handleAdd}
          >
            Add Task
          </Button>
          <Modal show={addModal} onHide={() => showAddModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-2">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <div className="label-create-item">Task Title</div>
                    <FormControl
                      placeholder="add title . . . "
                      size="lg"
                      value={userInput}
                      onChange={(e) => updateInput(e.target.value)}
                      aria-label="add title"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                  <div>
                    <div className="label-create-item">Task Description</div>
                    <FormControl
                      placeholder="add description . . . "
                      size="lg"
                      value={userEmail}
                      onChange={handleEmailChange}
                      aria-label="add something"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                  <div>
                    <div className="label-create-item">
                      Priority of the Task
                    </div>
                    <FormControl
                      placeholder="add Priority . . . "
                      size="lg"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      aria-label="add something"
                      aria-describedby="basic-addon2"
                    />
                  </div>
                </div>
                {!isValidEmail && (
                  <p style={{ color: "red" }}>
                    Please enter a valid email address
                  </p>
                )}
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  showAddModal(false);
                  setUserEmail("");
                  setUserInput("");
                  setUserRole("");
                  setIsValidEmail(true);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={addItem}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <Items
              currentItems={propCurrentItems}
              onDelete={(id) => deleteItem(id)}
              onEdit={(index) => handleEdit(index)}
            />
          </ListGroup>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Edit Title"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <FormControl
            placeholder="Edit Description"
            value={userEmail}
            onChange={handleEmailChange}
          />
          <FormControl
            placeholder="Edit Priority"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          />
          {!isValidEmail && (
            <p style={{ color: "red" }}>Please enter a valid email address</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setUserEmail("");
              setUserInput("");
              setUserRole("");
              setIsValidEmail(true);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskList;
