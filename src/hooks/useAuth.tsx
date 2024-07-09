import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("key");
    console.log(token);
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};
