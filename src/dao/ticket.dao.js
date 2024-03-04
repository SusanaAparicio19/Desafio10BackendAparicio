import { TicketsModel } from '../models/ticket.model.js'

class TicketDao {
    async createTicket(ticketData) {
        try {
          const ticket = await TicketsModel.create(ticketData);
          return ticket;
        } catch (error) {
          throw new Error("Error creating ticket in Dao");
        }
      }
    
    async findAllTickets() {    
        try {   
            const ticket = await TicketsModel.find().lean();
            return ticket;
        } catch (error) {
        throw new Error("Error reading ticket in Dao");
        }
    }
    
    async findTicketById(ticketId) {
        try {
            const ticket = await TicketsModel.findById(ticketId).lean();
            if (!ticket) {
                throw new Error('Ticket not found');
            }
            return ticket;
        } catch (error) {
            throw new Error("Error reading ticket in Dao"); 
        }
    }

    async updateTicket(ticketId, updatedTicket) {
        try {
            return await TicketsModel.findByIdAndUpdate(ticketId, updatedTicket, { new: true }).lean();
        } catch (error) {
            throw new Error("Error updating ticket in Dao");  
        }
    }

    async deleteTicketById(ticketId) {
        try {
            return await TicketsModel.findByIdAndDelete(ticketId);
        } catch (error) {
            throw new Error("Error deleting ticket in Dao");     
        }

    }
}

export const ticketDao = new TicketDao()
    
    