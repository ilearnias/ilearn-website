"use client";

import React from "react";
import "./WhatsAppButton.scss";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = "918089166792", // Default number - replace with your actual number
  message = "Hello! I'm interested in learning more about your programs.",
  className = "",
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={`whatsapp-button-container ${className}`}>
      <button
        className="whatsapp-button"
        onClick={handleWhatsAppClick}
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </button>
    </div>
  );
};

export default WhatsAppButton;
