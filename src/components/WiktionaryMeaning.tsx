import React, { useEffect, useState } from "react";

const WiktionaryMeaning = ({ word }: { word: string }) => {
  const [meaning, setMeaning] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word) return;

    setLoading(true);
    setError(null);

    const url = `https://en.wiktionary.org/w/api.php?action=query&titles=${word}&prop=extracts&format=json&origin=*`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const pageId = Object.keys(data.query.pages)[0];
        if (pageId === "-1") {
          setError("");
          setMeaning(null);
        } else {
          const extract = data.query.pages[pageId].extract;
          setMeaning(removeHTMLTags(extract));
        }
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, [word]);

  // Function to clean HTML tags
  const removeHTMLTags = (html: string): string => {
    let doc = new DOMParser().parseFromString(html, "text/html");

    let result: string = doc.body.textContent || "";

    console.log(result);
    let resultlines: string[] = result.split(/\r?\n|\r/);
    const index = resultlines.findIndex((line) => line.includes("References"));
    let filteredArray =
      index !== -1 ? resultlines.slice(0, index) : resultlines;

    filteredArray = filteredArray.map((line) =>
      line.includes(". Compare") ? line.split(". Compare")[0].trim() : line
    );

    filteredArray = filteredArray.filter(
      (line, index, arr) =>
        line !== "Pronunciation" && arr[index - 1] !== "Pronunciation"
    );

    return cleanSentence(filteredArray.join("\n"));
  };

  function cleanSentence(sentence: string): string {
    const badWords = [
      "fucking",
      "fucker",
      "fuck",
      "shit",
      "ass",
      "bastard",
      "bitch",
      "nigger",
    ]; // Add more words as needed
    badWords.forEach((badWord) => {
      const regex = new RegExp(`\\b${badWord}\\b`, "gi"); // Match whole word, case insensitive
      sentence = sentence.replace(regex, "****"); // Replace with asterisks
    });
    return sentence;
  }

  return (
    <>
      {meaning != "" && (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {meaning && <p>{meaning}</p>}
        </div>
      )}
    </>
  );
};

export default WiktionaryMeaning;
