import { useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.get("https://zenquotes.io/api/random");
      const newQuote = {
        content: response.data[0].q, 
        author: response.data[0].a, 
      };

      setQuote(newQuote);
      localStorage.setItem("quote", JSON.stringify(newQuote));
    } catch (err) {
      console.log(err);
      
      setError("Failed to fetch quote. Please try again.");
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
