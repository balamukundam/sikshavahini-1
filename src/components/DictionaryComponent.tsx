import { useState, useEffect } from "react";
import { EngToTelService } from "../services/engToTelugu";
import MultiSelectList from "./MultiSelectList";
import WiktionaryMeaning from "./WiktionaryMeaning";

interface Props {
  sentence: string;
  text: string;
  curLang: string;
}

const styles = {
  fixedBox: {
    position: "fixed" as const,
    top: "62%",
    height: "60%",
    width: "14%",
    right: "12px",
    transform: "translateY(-50%)",
    background: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
    overflowY: "auto" as const, // Explicitly typed as const
    maxHeight: "100vh",
  },
};

const DictionaryComponent = ({ text, curLang, sentence }: Props) => {
  const ett = new EngToTelService();

  const [transWord, setTransWord] = useState("");
  const [transSentence, setTransSentence] = useState("");
  const [transLangs, setTransLangs] = useState([""]);
  const [sl, setSl] = useState("te");

  let word = ett.getStringInUserLanguage(curLang, text);
  let sentenceLang = ett.getStringInUserLanguage(curLang, sentence);
  let transcri = ett.getStringInTranscript(text);

  function getSelectedLangs(langs: string[]) {
    setTransLangs(langs);
  }

  async function getMeaningInLang(
    lang: string,
    inword: string
  ): Promise<string> {
    let tl: string = "te";
    if (lang == "Sanskrit") tl = "sa";
    if (lang == "en") tl = "en";
    const cacheKey = `${sl}-${tl}-${inword}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(
      inword
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data?.[0]?.[0]?.[0]) {
        const translation = data[0][0][0];
        localStorage.setItem(cacheKey, JSON.stringify(translation)); // Cache result
        return translation; // No need to parse again, it's already a string
      }

      return "Translation not found";
    } catch (error) {
      console.error("Translation API Error:", error);
      return "Error fetching translation";
    }
  }
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchTranslations = async () => {
      const results: { [key: string]: string } = {};

      for (const lang of transLangs) {
        results[lang] = await getMeaningInLang(lang, word);
      }

      setTranslations(results);
    };

    fetchTranslations();
  }, [transLangs]);

  useEffect(() => {
    if (!word) return; // Prevent API call if word is empty

    let sourceLang = "te"; // Default: Telugu
    if (curLang === "devanagari") sourceLang = "sa"; // Sanskrit
    setSl(sourceLang);

    // Async function inside useEffect
    const fetchTranslation = async () => {
      const translation = await getMeaningInLang("en", word);
      const fullTranslation = await getMeaningInLang("en", sentenceLang);

      setTransWord(cleanSentence(translation));
      setTransSentence(cleanSentence(fullTranslation));
    };

    fetchTranslation();
  }, [word]);

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "te"; // Set language
      speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
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
    <div className="no-print" style={styles.fixedBox}>
      <p style={{ textAlign: "center" }}>🕉 Dictionary 🕉</p>

      <hr />
      <p> {word}</p>

      <hr />
      <p>{transcri}</p>

      <hr />
      <p>{transWord || "Loading..."}</p>
      <hr />

      <hr />
      <p>{transSentence || "Loading..."}</p>
      <hr />
      {/* {transLangs.map((item) => (
        <p key={item}>{translations[item] || "Loading..."}</p>
      ))} */}

      {/* <MultiSelectList getSelectedLangs={getSelectedLangs}></MultiSelectList> */}

      <button onClick={speakText} className="btn btn-primary">
        🔊 Read
      </button>

      <WiktionaryMeaning
        word={word.replace(/[.,!\s]+$/, "")}
      ></WiktionaryMeaning>
    </div>
  );
};

export default DictionaryComponent;
