import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
      <Button onClick={() => navigate(-1)} className="mt-6">
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
