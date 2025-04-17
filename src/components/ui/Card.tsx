import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white">
      {children}
    </div>
  );
};

// Export par défaut
export default Card;
export { CardContent };
