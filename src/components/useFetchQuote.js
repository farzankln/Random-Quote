import { useState, useEffect } from "react";
import axios from "axios";
import { diagnosticManager } from "../utils/diagnosticManager.js";

const useFetchQuote = () => {
  const [quote, setQuote] = useState(() => {
    const savedQuote = localStorage.getItem("quote");
    return savedQuote
      ? JSON.parse(savedQuote)
      : { content: "", author: "Unknown" };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError("");

    try {
      // Test network connectivity first
      const connectivityTest = await diagnosticManager.testEndpoint(
        "https://dummyjson.com/quotes/random",
        true
      );

      if (connectivityTest.status === "failed") {
        throw new Error(
          `Network connectivity failed: ${connectivityTest.errorMessage} (${connectivityTest.responseTime}ms timeout)`
        );
      }

      const response = await axios.get("https://dummyjson.com/quotes/random");

      // Fix: API returns a single object with 'quote' property, not 'content'
      if (response.data && response.data.quote && response.data.author) {
        const newQuote = {
          content: response.data.quote,
          author: response.data.author,
        };

        setQuote(newQuote);
        localStorage.setItem("quote", JSON.stringify(newQuote));
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      // Enhanced error logging with diagnostics
      const errorInfo = diagnosticManager.logError(err, {
        component: "useFetchQuote",
        function: "fetchRandomQuote",
        apiEndpoint: "https://dummyjson.com/quotes/random",
        attemptTime: new Date().toISOString(),
      });

      let errorMessage = "Failed to fetch quote. Please try again.";

      if (errorInfo.type === "NETWORK_ERROR") {
        errorMessage =
          "Network connection failed. Please check your internet connection and try again.";
      } else if (errorInfo.type === "TIMEOUT_ERROR") {
        errorMessage =
          "Request timed out. The quote service may be unavailable.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("quote")) {
      fetchRandomQuote();
    }
  }, []);

  return { quote, loading, error, fetchRandomQuote };
};

export default useFetchQuote;
