import asyncHandler from "@/lib/asyncHandler";
import sendResponse from "@/lib/sendResponse";
import taskServices from "@/services/task.services";
import httpStatus from "http-status";

class TaskController {
  private httpStatus = httpStatus
  private services = taskServices;
  private messageTitle = "Task";

  // Create
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: this.httpStatus.CREATED,
      message: `${this.messageTitle} Created Successfully`,
      data: result,
    });
  });

  // Get all tasks
  getAll = asyncHandler(async (req, res) => {
    const result = await this.services.getAll(req.query);

    sendResponse(res, {
      success: true,
      statusCode: this.httpStatus.OK,
      message: `${this.messageTitle} Retrieved Successfully`,
      data: result,
    });
  });

  // Get single tasks
  getSingle = asyncHandler(async (req, res) => {
    const result = await this.services.getSingle(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: this.httpStatus.OK,
      message: `${this.messageTitle} Retrieved Successfully`,
      data: result,
    });
  });

  // update single tasks
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: this.httpStatus.OK,
      message: `${this.messageTitle} updated Successfully`,
      data: result,
    });
  });

  // Get single tasks
  delete = asyncHandler(async (req, res) => {
    const result = await this.services.delete(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: this.httpStatus.OK,
      message: `${this.messageTitle} deleted Successfully`,
      data: result,
    });
  });
}

const taskController = new TaskController()
export default taskController