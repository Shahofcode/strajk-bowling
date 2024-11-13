import React, { useState } from "react";
import { sendBookingRequest } from "../api/bookingApi";
import { BookingRequest } from "../types/Booking";

interface BookingPageProps {
  onConfirm: (response: any) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onConfirm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lanes, setLanes] = useState(1);
  const [people, setPeople] = useState(1);
  const [shoes, setShoes] = useState<number[]>([]);

  const handleAddShoeSize = (size: number) => {
    setShoes((prevShoes) => [...prevShoes, size]);
  };

  const handleSubmit = async () => {
    try {
      const bookingRequest: BookingRequest = {
        when: `${date}T${time}`,
        lanes,
        people,
        shoes,
      };
      const response = await sendBookingRequest(bookingRequest);
      onConfirm(response);
    } catch (error) {
      alert("Ett fel inträffade. Försök igen.");
    }
  };

  return (
    <div className="booking-page">
      <h1>Boka din bowling</h1>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input type="number" min={1} value={lanes} onChange={(e) => setLanes(Number(e.target.value))} placeholder="Banor" />
      <input type="number" min={1} value={people} onChange={(e) => setPeople(Number(e.target.value))} placeholder="Personer" />
      {Array.from({ length: people }).map((_, index) => (
        <input
          key={index}
          type="number"
          placeholder={`Skostorlek ${index + 1}`}
          onChange={(e) => handleAddShoeSize(Number(e.target.value))}
        />
      ))}
      <button onClick={handleSubmit}>Skicka bokning</button>
    </div>
  );
};

export default BookingPage;
