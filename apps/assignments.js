import { Router } from "express";

import { assignments as assignmentsFromFile } from "../data/assignments.js";
import { comments as commentsFromFile } from "../data/comments.js";

let assignments = [...assignmentsFromFile];
let comments = [...commentsFromFile];

const assignmentRounter = Router();

assignmentRounter.get("/", (req, res) => {
  return res.json({
    data: assignments,
  });
});

assignmentRounter.get("/:id", (req, res) => {
  const assignmentId = +req.params.id;
  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  const assignment = assignments.filter((assign) => assign.id === assignmentId);

  return res.json({
    data: assignment[0],
  });
});

assignmentRounter.post("", (req, res) => {
  const newAssignment = req.body;
  const newAssignmentId = assignments[assignments.length - 1].id + 1;

  assignments.push({
    id: newAssignmentId,
    ...newAssignment,
  });

  return res.json({
    message: "New assignment has been created successfully",
  });
});

assignmentRounter.put("/:id", (req, res) => {
  const updateAssignment = req.body;
  const assignmentId = +req.params.id;

  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  const assignmentIndex = assignments.findIndex((assign) => {
    return assign.id === assignmentId;
  });

  assignments[assignmentIndex] = {
    id: assignmentId,
    ...updateAssignment,
  };

  return res.json({
    message: `Assignment ${assignmentId} has been updated successfully`,
  });
});

assignmentRounter.delete("/:id", (req, res) => {
  const assignmentId = +req.params.id;

  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  assignments = assignments.filter((assign) => {
    return assign.id !== assignmentId;
  });

  return res.json({
    message: `Assignment ${assignmentId} has been deleted successfully`,
  });
});

assignmentRounter.get("/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;

  const assignmentComments = comments.filter((comment) => {
    return assignmentId == comment.assignmentId;
  });

  return res.json({
    data: assignmentComments,
  });
});

assignmentRounter.post("/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;
  const newComment = req.body;
  const commentId = comments[comments.length - 1].id + 1;

  comments.push({
    id: commentId,
    assignmentId,
    ...newComment,
  });

  return res.json({
    message: `Comment of assignment ${assignmentId} has been added to assignment.`,
  });
});

assignmentRounter.delete("/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;

  const hasFound = comments.find(
    (comment) => comment.assignmentId === assignmentId
  );
  if (!hasFound) {
    return res.status(404).json({
      message: `${assignmentId} not found`,
    });
  }

  comments = comments.filter((comment) => {
    return comment.assignmentId != assignmentId;
  });

  return res.json({
    message: `Comment of assignment ${assignmentId} has been deleted.`,
  });
});

export default assignmentRounter;
