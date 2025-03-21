import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetchQuote = () => {
  const [quote, setQuote] = useState(() => {
    const savedQuote = localStorage.getItem("quote");
    return savedQuote ? JSON.parse(savedQuote) : { content: "", author: "" };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomQuote = useCallback(async () => {
    setLoading(true);
    setError("");

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.get("https://api.quotable.io/random", {
        signal,
      });
      const newQuote = {
        content: response.data.content || "No quote available",
        author: response.data.author || "Unknown",
      };

      setTimeout(() => {
        setQuote(newQuote);
        localStorage.setItem("quote", JSON.stringify(newQuote));
        setLoading(false);
      }, 500);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError("Failed to fetch quote. Please try again.");
      setQuote({ content: "No quote available", author: "Unknown" });
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!quote.content) {
      fetchRandomQuote();
    }
  }, [quote.content, fetchRandomQuote]);

  return { quote, loading, error, fetchRandomQuote };
};

export default useFetchQuote;
