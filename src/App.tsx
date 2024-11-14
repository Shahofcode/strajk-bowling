import React, { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import BookingPage from "./components/BookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import ReceiptPage from "./components/ReceiptPage";
import { BookingResponse } from "./types/Booking";

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => setStep(1);

  const handleConfirm = (response: BookingResponse) => {
    setBooking(response);
    setStep(2);
  };

  const handleNavigate = (
    page: "loading" | "booking" | "confirmation" | "receipt"
  ) => {
    setError(null); // Nollställ felmeddelandet
    if (page === "loading") setStep(0);
    if (page === "booking") setStep(1);
    if (page === "confirmation") setStep(2);
    if (page === "receipt") {
      if (booking) {
        setStep(3);
      } else {
        setError("You need to make a booking before accessing the receipt page.");
      }
    }
  };

  return (
    <>
      {error && <div className="error-banner">{error}</div>} {/* Felmeddelande */}
      {step === 0 && <LoadingPage onContinue={handleContinue} />}
      {step === 1 && (
        <BookingPage
          onConfirm={handleConfirm}
          onNavigate={handleNavigate}
          booking={booking} // Skicka med booking som prop
        />
      )}
      {step === 2 && booking && (
        <ConfirmationPage booking={booking} onNavigate={handleNavigate} />
      )}
      {step === 3 && booking && (
        <ReceiptPage booking={booking} onNavigate={handleNavigate} />
      )}
    </>
  );
};

export default App;
