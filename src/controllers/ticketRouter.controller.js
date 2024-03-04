import { ticketService } from '../service/ticket.service.js';

export async function createTicketPost(req, res, next) {
    try {
      const ticket = await ticketService.createTicket(req.user);
      res.json(ticket);
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Failed to create ticket" });
    }
  }
  
  export async function findAllTicketsGet(req, res, next) {
    try {
      const tickets = await ticketService.findAllTickets();
      res.json(tickets);
    } catch (error) {
      console.error("Error getting all tickets:", error);
      res.status(500).json({ error: "Failed to get all tickets" });
    }
  }
  
  export async function findTicketByIdGet(req, res, next) {
    try {
      const ticketId = req.params.id;
      const ticket = await ticketService.findTicketById(ticketId);
      if (!ticket) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.json(ticket);
    } catch (error) {
      console.error("Error getting ticket:", error);
      res.status(500).json({ error: "Failed to get ticket" });
    }
  }
  
  export async function updateTicketPut(req, res, next) {
    try {
      const ticketId = req.params.id;
      const ticket = await ticketService.updateTicket(ticketId);
      res.json(ticket);
    } catch (error) {
      console.error("Error updating ticket", error);
      res.status(500).json({ error: "Failed to update ticket" });
    }
  }
  
  export async function deleteTicketById(req, res, next) {
    try {
      const ticketId = req.params.id;
      await ticketService.deleteTicketById(ticketId);
      res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(500).json({ error: "Failed to delete ticket" });
    }
  }
  
