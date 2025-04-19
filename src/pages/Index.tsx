
import React from "react";
import { Navigate } from "react-router-dom";

// Redirect from Index page to our main Home page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
