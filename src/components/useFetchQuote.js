import { useState, useEffect } from "react";
import axios from "axios";

const useFetchQuote = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("https://api.quotable.io/random");
      const { content, author } = response.data;
      setQuote({ content, author });
    } catch {
      setError("Failed to fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return { quote, loading, error, fetchRandomQuote };
};

export default useFetchQuote;
