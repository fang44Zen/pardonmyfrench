import { useEffect, useState } from "react";
import "./loading-page.scss";

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Wait...</h1>
      </div>
    );
  }
  return null;
};

export default LoadingPage;
