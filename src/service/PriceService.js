import tickets from "./Tickets.js";

export const getTicketPrice = (ticketType) => {
  switch (ticketType) {
    case tickets.TCASUAL:
      return 39.2;
    case tickets.TUSUAL:
      return 92.55;
    case tickets.SENZILL:
      return 5;
    default:
      console.log(`Unrecognized ticket type ${ticketType}`);
  }
};
