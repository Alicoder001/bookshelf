import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("key");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};
