import React from "react";
import "../styles/ReceiptPage.css";
import logo from "../assets/logo.svg";
import { BookingResponse } from "../types/Booking";

interface ReceiptPageProps {
  booking: BookingResponse; // Bokningsuppgifter
  onNavigate: (page: "loading" | "booking" | "confirmation" | "receipt") => void;
}

const ReceiptPage: React.FC<ReceiptPageProps> = ({ booking, onNavigate }) => {
  return (
    <div className="receipt-page">
      {/* Logga */}
      <img
        src={logo}
        alt="Strajk Logo"
        className="receipt-logo"
        onClick={() => onNavigate("loading")} // Navigera till LoadingPage
        style={{ cursor: "pointer" }} // Gör loggan klickbar
      />

      {/* Rubrik */}
      <h1 className="receipt-title">BOOKING RECEIPT</h1>

      {/* Kvittouppgifter */}
      <div className="receipt-info">
        <p>
          <span className="receipt-label">Booking Number:</span> {booking.id}
        </p>
        <p>
          <span className="receipt-label">When:</span> {booking.when}
        </p>
        <p>
          <span className="receipt-label">People:</span> {booking.people}
        </p>
        <p>
          <span className="receipt-label">Lanes:</span> {booking.lanes}
        </p>
        <p>
          <span className="receipt-label">Total Cost:</span> {booking.price} kr
        </p>
      </div>

      {/* Avslutande text */}
      <p className="receipt-footer">Thank you for your booking! See you soon 🎳</p>
    </div>
  );
};

export default ReceiptPage;
