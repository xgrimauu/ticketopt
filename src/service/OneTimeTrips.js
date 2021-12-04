import { getTicketPrice } from "./PriceService.js";
import tickets from "./Tickets.js";

export default class OneTimeTripOps {
  getPriceForSimpleTickets = (trips) => {
    const singleTicket = {};
    singleTicket.price = getTicketPrice(tickets.SENZILL) * trips;
    singleTicket.units = trips;

    return singleTicket;
  };

  getPriceForTenTripTicket = (trips) => {
    const tenTripPrice = {};

    if (trips <= 10) {
      tenTripPrice.units = 1;
    } else {
      const quotient = Math.floor(trips / 10);
      tenTripPrice.units = trips % 10 === 0 ? quotient : quotient + 1;
    }

    tenTripPrice.price = tenTripPrice.units * getTicketPrice(tickets.TCASUAL);
    return tenTripPrice;
  };

  getPriceForMonthlyTicket = (days) => {
    const requiredTickets = days <= 30 ? 1 : Math.floor(days / 30);
    const monthlyTicketPrice = getTicketPrice(tickets.TUSUAL) * requiredTickets;

    return monthlyTicketPrice;
  };
}
