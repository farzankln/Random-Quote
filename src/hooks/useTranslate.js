import { useState, useEffect, useCallback } from "react";

const useTranslate = () => {
  const [translation, setTranslation] = useState({ quote: "", author: "" });
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState("");
  const [isTranslationEnabled, setIsTranslationEnabled] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);

  // Clear translation when quote changes (when quote prop becomes empty/null)
  useEffect(() => {
    if (!translation.quote && !translation.author && !isTranslating) {
      setTranslationError("");
      setIsContentReady(false);
    }
  }, [translation, isTranslating]);

  // Reset content ready state when translation is disabled
  useEffect(() => {
    if (!isTranslationEnabled) {
      setIsContentReady(true);
    }
  }, [isTranslationEnabled]);

  const translateText = async (text, targetLang = "fa") => {
    if (!text) return "";

    try {
      // Using the Google Translate API endpoint provided
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const data = await response.json();

      // Extract translated text from the response
      // The Google Translate API returns an array where the translated text is at [0]
      const translatedText = data[0]?.map((item) => item[0]).join("") || "";

      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  };

  // Translate both quote and author together
  const translateQuoteAndAuthor = useCallback(
    async (quote, author, targetLang = "fa") => {
      if (!quote && !author) {
        setIsContentReady(true);
        return { quote: "", author: "" };
      }

      setIsTranslating(true);
      setTranslationError("");
      setIsTranslationEnabled(true);
      setIsContentReady(false);

      try {
        // Translate both quote and author in parallel
        const [translatedQuote, translatedAuthor] = await Promise.all([
          quote ? translateText(quote, targetLang) : Promise.resolve(""),
          author ? translateText(author, targetLang) : Promise.resolve(""),
        ]);

        const result = { quote: translatedQuote, author: translatedAuthor };
        setTranslation(result);
        setIsContentReady(true);
        return result;
      } catch (error) {
        console.error("Translation error:", error);
        setTranslationError("Failed to translate text. Please try again.");
        setTranslation({ quote: "", author: "" });
        setIsContentReady(true); // Allow content to show even if translation fails
        throw error;
      } finally {
        setIsTranslating(false);
      }
    },
    []
  );

  const clearTranslation = () => {
    setTranslation({ quote: "", author: "" });
    setTranslationError("");
    setIsTranslationEnabled(false);
    setIsContentReady(true);
  };

  const toggleTranslation = async (quote, author) => {
    if (isTranslationEnabled && (translation.quote || translation.author)) {
      // If translation is enabled and exists, clear it
      clearTranslation();
    } else if (quote || author) {
      // If no translation, translate both quote and author
      await translateQuoteAndAuthor(quote, author);
    }
  };

  // Check if content should show (either translation disabled or translation completed)
  const shouldShowContent = useCallback(() => {
    return !isTranslationEnabled || isContentReady;
  }, [isTranslationEnabled, isContentReady]);

  // Auto-translate new quote and author if translation was previously enabled
  const autoTranslateIfEnabled = useCallback(
    async (quote, author) => {
      if (isTranslationEnabled && (quote || author)) {
        await translateQuoteAndAuthor(quote, author);
      }
    },
    [isTranslationEnabled, translateQuoteAndAuthor]
  );

  return {
    translation,
    isTranslating,
    translationError,
    isTranslationEnabled,
    isContentReady,
    translateQuoteAndAuthor,
    clearTranslation,
    toggleTranslation,
    autoTranslateIfEnabled,
    shouldShowContent,
  };
};

export default useTranslate;
