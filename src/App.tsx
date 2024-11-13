import React, { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import BookingPage from "./components/BookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import { BookingResponse } from "./types/Booking";

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState<BookingResponse | null>(null);

  const handleContinue = () => setStep(1);

  const handleConfirm = (response: BookingResponse) => {
    setBooking(response);
    setStep(2);
  };

  return (
    <>
      {step === 0 && <LoadingPage onContinue={handleContinue} />}
      {step === 1 && <BookingPage onConfirm={handleConfirm} />}
      {step === 2 && booking && <ConfirmationPage booking={booking} />}
    </>
  );
};

export default App;
