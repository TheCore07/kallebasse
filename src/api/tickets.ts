import { api } from './axios';
import type { Ticket } from '@/types/Ticket'

export async function getTickets() {
    return api.get("/tickets");
}

export async function createTicket(title: string, description: string) {
    return api.post("/tickets/create", {title: title, description: description});
}

export async function updateTicket(selected: Ticket ) {
    return api.put("/tickets/update", selected);
}

export async function deleteTicket(id: string) {
    return api.delete(`/tickets/delete/${id}`);
}