import { useState, useEffect } from "react";
import axios from "axios";
import "../components/randomQuote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons/faArrowRightLong";
import ContentLoading from "./contentLoading";
import AuthorLoading from "./authorLoading";

const RandomQuote = () => {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(true);

  const fetchRandomQuote = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      params: { language_code: "en" },
      headers: {
        "x-rapidapi-key": "91ec8c0be6msh513fb2b879d4439p1098c8jsna76ec4000a19",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const { content, originator } = response.data;
      setQuote({ content, author: originator.name });
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="2xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-5/6 w-11/12 font-mono text-darkBrowne dark:text-parchment">
      <div className="xl:h-60 lg:h-72 h-80 flex items-center justify-center sm:text-3xl text-2xl text-center pb-4">
        {loading ? <ContentLoading /> : <p>&ldquo; {quote.content} &rdquo;</p>}
      </div>
      <div className="sm:flex justify-between items-center p-4 border-t-2 border-darkBrowne dark:border-parchment">
        {loading ? (
          <AuthorLoading />
        ) : (
          <span className="text-xl">- {quote.author}</span>
        )}
        <div className="text-2xl text-parchment text-center sm:m-0 mt-10 sm:block grid grid-cols-2">
          <button className="bg-kombuGreen dark:bg-parchment text-amber-50 dark:text-darkBrowne rounded sm:m-2 mr-2 active:scale-9 hover:scale-105 transition ease-in-out delay-75">
            <a
              className="content-center block sm:h-10 h-12 sm:w-20 pt-1"
              href={`https://en.wikipedia.org/wiki/${quote.author}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWikipediaW} />
            </a>
          </button>
          <button
            onClick={fetchRandomQuote}
            className="bg-darkBrowne rounded sm:h-10 h-12 sm:w-20 sm:m-2 ml-2 pt-1 active:scale-95 hover:scale-105 transition ease-in-out delay-75"
          >
            <FontAwesomeIcon icon={faArrowRightLong} style={{ fontSize: "" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
