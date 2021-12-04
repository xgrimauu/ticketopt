//import tickets from "./Tickets.js";
//import { getTicketPrice } from "./PriceService.js";
import OneTimeTripOps from "./OneTimeTrips";
import periodicity from "./Periodicity";
import RecurrentTripOps from "./RecurrentTripOps";

export default class TicketCalculator {
  constructor() {
    this.oneTimeTripsOps = new OneTimeTripOps();
    this.recurrentTripOps = new RecurrentTripOps();
  }

  getPriceList(trips, periodicity, isRecurrent) {
    return isRecurrent
      ? this.getRecurrentPriceList(trips, periodicity)
      : this.getOneTimePriceList(trips);
  }

  getOneTimePriceList(trips) {
    let priceList = [];

    //Simple ticket
    const simpleTicket = this.oneTimeTripsOps.getPriceForSimpleTickets(trips);
    priceList.push(
      `${simpleTicket.units} billet/s senzill/s. Total:  ${simpleTicket.price}€.`
    );

    //Ten trip ticket
    const tenTripTicket = this.oneTimeTripsOps.getPriceForTenTripTicket(trips);
    priceList.push(
      `${tenTripTicket.units} T-Casuals. Total: ${tenTripTicket.price}€.`
    );

    //Monthly ticket
    const monthlyTicketPrice =
      this.oneTimeTripsOps.getPriceForMonthlyTicket(30);
    priceList.push(`T-Usual. Total ${monthlyTicketPrice}€.`);

    return priceList;
  }

  getRecurrentPriceList(trips, period) {
    let priceList = [];

    const monthlyTrips = period === periodicity.WEEKLY ? trips * 4 : trips;
    //Simple ticket
    const simpleTicket =
      this.recurrentTripOps.getPriceForSimpleTickets(monthlyTrips);
    priceList.push(
      `${simpleTicket.units} billets senzills. ${simpleTicket.price.toFixed(
        2
      )} €/mes.`
    );

    //Ten trip ticket
    const tenTripTicket =
      this.recurrentTripOps.getPriceForTenTripTicket(monthlyTrips);
    priceList.push(
      `Amb T-Casual et costarà ${tenTripTicket.price.toFixed(2)} €/mes.`
    );

    //Monthly ticket
    const monthlyTicketPrice =
      this.recurrentTripOps.getPriceForMonthlyTicket(29);
    priceList.push(`T-Usual. Total ${monthlyTicketPrice.toFixed(2)} €/mes.`);

    return priceList;
  }
}
