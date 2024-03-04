import { Router } from 'express';
import { createTicketPost, findAllTicketsGet, findTicketByIdGet, updateTicketPut, deleteTicketById } from '../controllers/ticketRouter.controller.js'

const ticketRouter = Router();

ticketRouter.get("/", findAllTicketsGet);
ticketRouter.get("/:id", findTicketByIdGet);
ticketRouter.post("/", createTicketPost);
ticketRouter.put("/:id", updateTicketPut);
ticketRouter.delete("/:id", deleteTicketById);

export default ticketRouter;
