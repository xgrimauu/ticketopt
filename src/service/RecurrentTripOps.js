import { getTicketPrice } from "./PriceService.js";
import tickets from "./Tickets.js";

export default class RecurrentTripOps {
  getPriceForSimpleTickets = (monthlyTrips) => {
    const singleTicket = {};
    singleTicket.price = getTicketPrice(tickets.SENZILL) * monthlyTrips;
    singleTicket.units = monthlyTrips;

    return singleTicket;
  };

  getPriceForTenTripTicket = (monthlyTrips) => {
    const tenTripPrice = {};
    const pricePerTrip = getTicketPrice(tickets.TCASUAL) / 10;

    tenTripPrice.price = pricePerTrip * monthlyTrips; // €/trip * trip/month = €/month
    return tenTripPrice;
  };

  getPriceForMonthlyTicket = (days) => {
    const requiredTickets = days <= 30 ? 1 : Math.floor(days / 30);
    const monthlyTicketPrice = getTicketPrice(tickets.TUSUAL) * requiredTickets;

    return monthlyTicketPrice;
  };
}
