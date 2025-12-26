import { useState, useCallback } from "react";

const useFavoriteTranslations = () => {
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState({});
  const [translationErrors, setTranslationErrors] = useState({});

  const translateText = async (text, targetLang = "fa") => {
    if (!text) return "";

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const data = await response.json();
      const translatedText = data[0]?.map((item) => item[0]).join("") || "";

      return translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  };

  const translateFavoriteItem = useCallback(
    async (favoriteId, quote, author, targetLang = "fa") => {
      if (!quote && !author) {
        return { quote: "", author: "" };
      }

      setIsTranslating((prev) => ({ ...prev, [favoriteId]: true }));
      setTranslationErrors((prev) => ({ ...prev, [favoriteId]: "" }));

      try {
        const [translatedQuote, translatedAuthor] = await Promise.all([
          quote ? translateText(quote, targetLang) : Promise.resolve(""),
          author ? translateText(author, targetLang) : Promise.resolve(""),
        ]);

        const result = { quote: translatedQuote, author: translatedAuthor };
        setTranslations((prev) => ({ ...prev, [favoriteId]: result }));
        return result;
      } catch (error) {
        console.error("Translation error:", error);
        const errorMessage = "Failed to translate text. Please try again.";
        setTranslationErrors((prev) => ({
          ...prev,
          [favoriteId]: errorMessage,
        }));
        throw error;
      } finally {
        setIsTranslating((prev) => ({ ...prev, [favoriteId]: false }));
      }
    },
    []
  );

  const clearFavoriteTranslation = useCallback((favoriteId) => {
    setTranslations((prev) => {
      const newTranslations = { ...prev };
      delete newTranslations[favoriteId];
      return newTranslations;
    });
    setTranslationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[favoriteId];
      return newErrors;
    });
    setIsTranslating((prev) => {
      const newTranslating = { ...prev };
      delete newTranslating[favoriteId];
      return newTranslating;
    });
  }, []);

  const toggleFavoriteTranslation = useCallback(
    async (favoriteId, quote, author) => {
      const existingTranslation = translations[favoriteId];

      if (
        existingTranslation &&
        (existingTranslation.quote || existingTranslation.author)
      ) {
        // If translation exists, clear it
        clearFavoriteTranslation(favoriteId);
      } else if (quote || author) {
        // If no translation, translate both quote and author
        await translateFavoriteItem(favoriteId, quote, author);
      }
    },
    [translations, translateFavoriteItem, clearFavoriteTranslation]
  );

  const getFavoriteTranslation = useCallback(
    (favoriteId) => {
      return translations[favoriteId] || { quote: "", author: "" };
    },
    [translations]
  );

  const isFavoriteTranslating = useCallback(
    (favoriteId) => {
      return isTranslating[favoriteId] || false;
    },
    [isTranslating]
  );

  const getFavoriteTranslationError = useCallback(
    (favoriteId) => {
      return translationErrors[favoriteId] || "";
    },
    [translationErrors]
  );

  const hasFavoriteTranslation = useCallback(
    (favoriteId) => {
      const translation = translations[favoriteId];
      return translation && (translation.quote || translation.author);
    },
    [translations]
  );

  return {
    translateFavoriteItem,
    clearFavoriteTranslation,
    toggleFavoriteTranslation,
    getFavoriteTranslation,
    isFavoriteTranslating,
    getFavoriteTranslationError,
    hasFavoriteTranslation,
  };
};

export default useFavoriteTranslations;
