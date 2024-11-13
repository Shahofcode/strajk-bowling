import React from "react";
import { BookingResponse } from "../types/Booking";

interface ConfirmationPageProps {
  booking: BookingResponse;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ booking }) => {
  return (
    <div className="confirmation-page">
      <h1>Bokningsbekräftelse</h1>
      <p>Bokningsnummer: {booking.id}</p>
      <p>Datum & Tid: {booking.when}</p>
      <p>Antal banor: {booking.lanes}</p>
      <p>Antal personer: {booking.people}</p>
      <p>Totalt pris: {booking.price} kr</p>
    </div>
  );
};

export default ConfirmationPage;
