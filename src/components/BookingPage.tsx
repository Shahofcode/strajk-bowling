import React, { useState } from "react";
import { sendBookingRequest } from "../api/bookingApi";
import { BookingRequest } from "../types/Booking";
import "../styles/BookingPage.css";
import logo from "../assets/logo.svg";

interface BookingPageProps {
  onConfirm: (response: any) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onConfirm }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"booking" | "confirmation">("booking");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lanes, setLanes] = useState<string>("1");
  const [people, setPeople] = useState<string>("1");
  const [shoes, setShoes] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddShoeSize = (size: number) => {
    setShoes((prevShoes) => [...prevShoes, size]);
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

    setError(null);

    try {
      const bookingRequest: BookingRequest = {
        when: `${date}T${time}`,
        lanes: Number(lanes),
        people: Number(people),
        shoes,
      };
      const response = await sendBookingRequest(bookingRequest);
      onConfirm(response);
    } catch (error) {
      alert("Ett fel inträffade. Försök igen.");
    }
  };

  const renderContent = () => {
    if (currentPage === "booking") {
      return (
        <>
          <h1 className="booking-title">BOOKING</h1>
          <h2 className="booking-subtitle">When, WHAT & Who</h2>

          <div className="form-container">
            {/* Date and Time */}
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

            {/* People and Lanes */}
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
                    onChange={(e) => setPeople(e.target.value.slice(0, 2))}
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
                    onChange={(e) => setLanes(e.target.value.slice(0, 2))}
                    onBlur={() => handleBlur(lanes, setLanes)}
                  />
                  <span className="unit">lanes</span>
                </div>
              </div>
            </div>

            <h3 className="lanes-text">SHOES</h3>

            {/* Shoe Sizes */}
            <div className="shoes">
              {Array.from({ length: Number(people) }).map((_, index) => (
                <div className="shoe-input" key={index}>
                  <label htmlFor={`shoe-size-${index}`}>SHOE SIZE {index + 1}</label>
                  <input
                    type="number"
                    id={`shoe-size-${index}`}
                    placeholder={`Size ${index + 1}`}
                    onChange={(e) => handleAddShoeSize(Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button onClick={handleSubmit} className="submit-button">
            STRIIIIIKE!
          </button>
        </>
      );
    } else if (currentPage === "confirmation") {
      return (
        <div className="confirmation-container">
          <h1 className="title">CONFIRMATION</h1>
          <p>Här ser du detaljer om din bokning och kan bekräfta.</p>
        </div>
      );
    }
  };

  return (
    <div className="booking-page">
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
                setCurrentPage("booking");
              }}
            >
              BOOKING
            </h2>
            <h2
              className="menu-link"
              onClick={() => {
                setMenuOpen(false);
                setCurrentPage("confirmation");
              }}
            >
              CONFIRMATION
            </h2>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default BookingPage;
