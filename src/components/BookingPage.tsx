import React, { useState } from "react";
import { sendBookingRequest } from "../api/bookingApi";
import { BookingRequest } from "../types/Booking";
import "../styles/BookingPage.css";
import logo from "../assets/logo.svg";

interface BookingPageProps {
  onConfirm: (response: any) => void;
  onNavigate: (page: "booking" | "confirmation" | "receipt") => void;
  booking: any;
}

const BookingPage: React.FC<BookingPageProps> = ({ onConfirm, onNavigate, booking }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lanes, setLanes] = useState<string>("1");
  const [people, setPeople] = useState<string>("1");
  const [shoes, setShoes] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddShoeSize = (size: number, index: number) => {
    setShoes((prevShoes) => {
      const updatedShoes = [...prevShoes];
      updatedShoes[index] = size;
      return updatedShoes;
    });
  };

  const handleBlur = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const num = Number(value);
    if (!value || isNaN(num)) {
      setter("1");
    } else if (num < 1) {
      setter("1");
    } else if (num > 10) {
      setter("10");
    }
  };

  const handleSubmit = async () => {
    if (!date || !time) {
      setError("Please select both a date and a time before proceeding.");
      return;
    }

    if (shoes.length !== Number(people) || shoes.some((size) => size <= 0 || isNaN(size))) {
      setError("Please fill in valid shoe sizes for all players.");
      return;
    }

    setError(null);

    try {
      const bookingRequest: BookingRequest = {
        when: `${date} / ${time}`,
        lanes: Number(lanes),
        people: Number(people),
        shoes,
      };

      const response = await sendBookingRequest(bookingRequest);
      onConfirm(response);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="booking-page">
      {/* Hamburgermeny */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(true)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <img src={logo} alt="Strajk Logo" className="booking-logo" />

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
                if (booking) {
                  onNavigate("receipt");
                } else {
                  setError("You need to make a booking before accessing the receipt page.");
                }
              }}
            >
              CONFIRMATION
            </h2>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <h1 className="booking-title">BOOKING</h1>
      <h2 className="booking-subtitle">When, WHAT & Who</h2>

      <div className="form-container">
        <div className="date-time">
          <div className="date-input">
            <label htmlFor="date">DATE</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="time-input">
            <label htmlFor="time">TIME</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="people-lanes">
          <div className="people-input">
            <label htmlFor="people">NUMBER OF AWESOME PEOPLE</label>
            <div className="input-with-unit">
              <input
                type="number"
                id="people"
                value={people}
                min="1"
                max="10"
                onChange={(e) => setPeople(e.target.value)}
                onBlur={() => handleBlur(people, setPeople)}
              />
              <span className="unit">pers</span>
            </div>
          </div>

          <div className="lanes-input">
            <label htmlFor="lanes">NUMBER OF LANES</label>
            <div className="input-with-unit">
              <input
                type="number"
                id="lanes"
                value={lanes}
                min="1"
                max="10"
                onChange={(e) => setLanes(e.target.value)}
                onBlur={() => handleBlur(lanes, setLanes)}
              />
              <span className="unit">lanes</span>
            </div>
          </div>
        </div>

        <h3 className="lanes-text">SHOES</h3>

        <div className="shoes">
          {Array.from({ length: Number(people) }).map((_, index) => (
            <div className="shoe-input" key={index}>
              <label htmlFor={`shoe-size-${index}`}>SHOE SIZE {index + 1}</label>
              <input
                type="number"
                id={`shoe-size-${index}`}
                placeholder={`Size ${index + 1}`}
                onChange={(e) => handleAddShoeSize(Number(e.target.value), index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleSubmit} className="submit-button">
          STRIIIIIKE!
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
