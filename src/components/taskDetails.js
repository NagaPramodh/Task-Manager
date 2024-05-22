import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../App.css";
const TaskDetails = () => {
  const { id } = useParams(); // Retrieve the user ID from URL params
  const task = useSelector((state) =>
    state.users.list.find((task) => task.id === Number(id))
  ); // Get the user details from Redux store based on the ID
  console.log(task, "task");
  return (
    <div>
      <div class="card user-details-card">
        <div class="card-header">Task Details</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>Task Id: {task.id}</p>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Priority: {task.priority}</p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
