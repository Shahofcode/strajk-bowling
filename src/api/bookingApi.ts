import { BookingRequest, BookingResponse } from "../types/Booking";

const BASE_URL = "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "738c6b9d-24cf-47c3-b688-f4f4c5747662";

export const sendBookingRequest = async (bookingRequest: BookingRequest): Promise<BookingResponse> => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST", // Endast huvud-URL används
      headers: {
        "x-api-key": API_KEY, // API-nyckel för autentisering
      },
      body: JSON.stringify(bookingRequest), // Bokningsobjektet som ska skickas
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BookingResponse = await response.json(); // Omvandlar API-svaret till ett objekt
    return data;
  } catch (error) {
    console.error("Error submitting booking request:", error);
    throw error; // Vidarebefordrar felet för hantering i anropande kod
  }
};
