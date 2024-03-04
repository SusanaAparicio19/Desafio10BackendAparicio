import { ticketRepository } from '../repository/ticket.repository.js'
import { cartService } from './carts.service.js';


class TicketService {
    async createTicket(user) {
      try {
        const cartId = user.cart;
        const cart = await cartService.findCartById(cartId);
        if (!cart) throw new Error("Cart not found");
  
        const totalAmount = cart.product.reduce((total, product) => {
          return total + product.pid.price * product.quantity;
        }, 0);
  
        const ticket = await ticketRepository.createTicket({
          amount: totalAmount,
          purchaser: user.email,
        });
  
        return ticket;
      } catch (error) {
        throw new Error("Error creating ticket in service");
      }
    }
    
    async findAllTickets() {
      try {
        return await ticketRepository.findAllTickets();
      } catch (error) {
        throw new Error("Error getting all tickets in service");
      }
    }
  
    async findTicketById(ticketId) {
        try {
            return await ticketRepository.findTicketById(ticketId);
      } catch (error) {
        throw new Error("Error getting ticket in service");
      }
    }
 
    async updateTicket(ticketId, updatedTicket) {
        try {
            return await ticketRepository.updateTicket(ticketId, updatedTicket);
        } catch (error) {
            throw new Error("Error updating ticket in service");  
        }
    }    

    async deleteTicketById(ticketId) {
        try {
            return await ticketRepository.deleteTicketById(ticketId);
      } catch (error) {
        throw new Error("Error deleting ticket in service");
      }
    }
  
  }
  
  export const ticketService = new TicketService();

