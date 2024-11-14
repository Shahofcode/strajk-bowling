import React, { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import BookingPage from "./components/BookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import ReceiptPage from "./components/ReceiptPage";
import { BookingResponse } from "./types/Booking";

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingResponse | null>(null);

  const handleContinue = () => setStep(1);

  const handleConfirm = (response: BookingResponse) => {
    setBooking(response);
    setStep(2);
  };

  const handleNavigate = (
    page: "loading" | "booking" | "confirmation" | "receipt"
  ) => {
    if (page === "loading") setStep(0);
    if (page === "booking") setStep(1);
    if (page === "confirmation") setStep(2);
    if (page === "receipt") setStep(3);
  };

  return (
    <>
      {step === 0 && <LoadingPage onContinue={handleContinue} />}
      {step === 1 && <BookingPage onConfirm={handleConfirm} />}
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
