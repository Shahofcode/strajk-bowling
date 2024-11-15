import React, { useState } from "react";
import { BookingResponse } from "../types/Booking";
import "../styles/ConfirmationPage.css";
import logo from "../assets/logo.svg";

interface ConfirmationPageProps {
  booking: BookingResponse;
  onNavigate: (page: "booking" | "confirmation" | "receipt") => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ booking, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="confirmation-page">
      {/* Hamburgermeny */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(true)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Meny-overlay */}
      {menuOpen && (
        <div className="menu-overlay">
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
          <div className="menu-content">
            <h1 className="menu-title">MENU</h1>
            <h2
              className="menu-link"
              onClick={() => {
                setMenuOpen(false);
                onNavigate("booking");
              }}
            >
              BOOKING
            </h2>
            <h2
              className="menu-link"
              onClick={() => {
                setMenuOpen(false);
                onNavigate("receipt");
              }}
            >
              CONFIRMATION
            </h2>
          </div>
        </div>
      )}

      {/* Logga */}
      <img src={logo} alt="Strajk Logo" className="confirmation-logo" />

      {/* Rubriker */}
      <h1 className="see-you-soon-text">SEE YOU SOON!</h1>
      <h2 className="booking-details-text">BOOKING DETAILS</h2>

      {/* Bokningsuppgifter */}
      <div className="booking-info">
        <div className="input-group">
          <label htmlFor="when">When</label>
          <input type="text" id="when" value={booking.when} readOnly />
        </div>
        <div className="input-group">
          <label htmlFor="who">Who</label>
          <input type="text" id="who" value={`${booking.people} pers`} readOnly />
        </div>
        <div className="input-group">
          <label htmlFor="lanes">Lanes</label>
          <input type="text" id="lanes" value={`${booking.lanes} lanes`} readOnly />
        </div>
        <div className="input-group">
          <label htmlFor="booking-number">Booking Number</label>
          <input type="text" id="booking-number" value={booking.id} readOnly />
        </div>
        <div className="input-group">
          <label htmlFor="total-cost">Total Cost</label>
          <input
            type="text"
            id="total-cost"
            value={`${booking.price} kr`}
            readOnly
            className="red-border"
          />
        </div>
      </div>

      {/* Knapp-container */}
      <div className="button-container">
        <button
          className="confirm-button"
          onClick={() => onNavigate("receipt")}
        >
          SWEET, LETS GO!
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
