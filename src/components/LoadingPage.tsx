import React from "react";
import "../styles/LoadingPage.css";
import logo from "../assets/logo.svg";

interface LoadingPageProps {
  onContinue: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onContinue }) => {
  return (
    <div className="loading-page">
      <img
        src={logo} // Använd den importerade loggan
        alt="Strajk Logo"
        className="loading-logo"
        onClick={onContinue}
      />
      <h1 className="loading-title">STRAJK</h1>
      <p className="loading-subtitle">BOWLING</p>
    </div>
  );
};

export default LoadingPage;
