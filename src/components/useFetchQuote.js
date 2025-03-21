import { useState, useEffect } from "react";
import axios from "axios";

const useFetchQuote = () => {
  const [quote, setQuote] = useState(() => {
    const savedQuote = localStorage.getItem("quote");
    return savedQuote ? JSON.parse(savedQuote) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError("");

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.get("https://api.quotable.io/random", { signal });
      const newQuote = {
        content: response.data.content,
        author: response.data.author,
      };

      setTimeout(() => {
        setQuote(newQuote);
        localStorage.setItem("quote", JSON.stringify(newQuote));
        setLoading(false);
      }, 500);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError("Failed to fetch quote. Please try again.");
      setLoading(false);
    }

    return () => controller.abort(); // لغو درخواست در صورت خروج از صفحه
  };

  useEffect(() => {
    if (!quote) {
      fetchRandomQuote();
    }
  }, []);

  return { quote, loading, error, fetchRandomQuote };
};

export default useFetchQuote;
