import {
  addTask,
  getTaskByUser,
  getAllTask,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask,
  deleteTaskByUser,
} from "../controllers/task.controller.js";
import {
  requirePremium,
  requireRole,
  verifyToken,
} from "../middlewares/auth.middleware.js";

// id INT
// user_id INT
// title VARCHAR(255)
// description
// status VARCHAR(20)
// created_at
// updated_at

// Task schema
const task = {
  type: "object",
  properties: {
    id: { type: "number" },
    user_id: { type: "number" },
    title: { type: "string" },
    description: { type: "string" },
    status: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
};

// Error schema
const error = {
  type: "object",
  properties: {
    msg: { type: "string" },
  },
};

// Id Param schema
const idParam = {
  type: "object",
  properties: {
    id: { type: "integer" },
  },
  required: ["id"],
};

// header schema
const headerSchema = {
  type: "object",
  properties: {
    authorization: {
      type: "string",
      pattern: "^Bearer\\s.+$",
    },
  },
  required: ["authorization"],
};

// SCHEMA VALIDATORS //
const getTasksOpts = {
  headers: headerSchema,
  preHandler: [verifyToken, requireRole("admin")],
  schema: {
    response: {
      200: {
        type: "array",
        items: task,
      },
      404: error,
      500: error,
    },
  },
  handler: getAllTask,
};

const getTaskByIdOpts = {
  headers: headerSchema,
  preHandler: [verifyToken],
  schema: {
    params: idParam,
    response: {
      200: task,
      404: error,
      500: error,
    },
  },
  handler: getTaskById,
};

const getTasksByUserOpts = {
  headers: headerSchema,
  preHandler: [verifyToken],
  schema: {
    response: {
      200: {
        type: "array",
        items: task,
      },
      404: error,
      500: error,
    },
  },
  handler: getTaskByUser,
};

const addTaskOpts = {
  headers: headerSchema,
  preHandler: [verifyToken],
  schema: {
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
        description: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          msg: { type: "string" },
          task: task,
        },
      },
      400: error,
      500: error,
    },
  },
  handler: addTask,
};

const deleteTaskOpts = {
  headers: headerSchema,
  preHandler: [verifyToken, requireRole("admin")],
  schema: {
    params: idParam,
    response: {
      200: {
        type: "object",
        properties: {
          msg: { type: "string" },
          task: task,
        },
      },
      404: error,
      500: error,
    },
  },
  handler: deleteTask,
};

const deleteTaskByUserOpts = {
  headers: headerSchema,
  preHandler: [verifyToken],
  schema: {
    params: idParam,
    response: {
      200: {
        type: "object",
        properties: {
          msg: { type: "string" },
          task: task,
        },
      },
      404: error,
      500: error,
    },
  },
  handler: deleteTaskByUser,
};

const updateTaskStatusOpts = {
  headers: headerSchema,
  preHandler: [verifyToken],
  schema: {
    params: idParam,
    body: {
      type: "object",
      required: ["status"],
      properties: {
        status: { type: "string" },
      },
    },
    reponse: {
      200: {
        type: "object",
        properties: {
          msg: { type: "string" },
          task: task,
        },
      },
      404: error,
      500: error,
    },
  },
  handler: updateTaskStatus,
};

const updateTaskOpts = {
  headers: headerSchema,
  preHandler: [verifyToken],
  schema: {
    params: idParam,
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
      },
    },
    reponse: {
      200: {
        type: "object",
        properties: {
          msg: { type: "string" },
          task: task,
        },
      },
      404: error,
      500: error,
    },
  },
  handler: updateTask,
};

async function taskRoutes(fastify, options) {
  // Get all tasks
  fastify.get("/", getTasksOpts);

  // Get a single task by the id
  fastify.get("/:id", getTaskByIdOpts);

  // Get all tasks by a particular user
  fastify.get("/me", getTasksByUserOpts);

  // Add a new task
  fastify.post("/", addTaskOpts);

  // Delete Task
  fastify.delete("/:id", deleteTaskOpts);

  // Delete a task by a particular user
  fastify.delete("/me/:id", deleteTaskByUserOpts);

  // Edit the status of a task for the current user
  fastify.put("/:id/status", updateTaskStatusOpts);

  // Edit the details of a task for the current user
  fastify.put("/:id", updateTaskOpts);
}

export default taskRoutes;

// // const { verifyToken } = require("../middlewares/auth.middleware");
// const taskController = require("../controllers/task.controller");

// // Add a new task for the current user
// router.post("/", verifyToken, taskController.addTask);

// // Get all Tasks of the current user
// router.get("/me", verifyToken, taskController.getTaskByUser);

// // Get all tasks of all users
// router.get("/", verifyToken, taskController.getAllTask);

// // Get a task by the task's id
// router.get("/:id", verifyToken, taskController.getTaskById);

// // Edit the status of a task for the current user
// router.put("/:id/status", verifyToken, taskController.updateTaskStatus);

// // Edit the details of a task for the current user
// router.put("/:id", verifyToken, taskController.updateTask);

// module.exports = router;
