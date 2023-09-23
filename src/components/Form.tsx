import { useState } from "react";
import generateUniqueId from "../uniqueId/getId";
import "remixicon/fonts/remixicon.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import matchetext from "../matchtext";

type GreetProps = {
  setMessages: any | undefined;
  messages: any | undefined;
  form: any | undefined;
  setMatch: any | undefined;
};

function Form(prop: GreetProps) {
  const { setMessages, form, setMatch } = prop;
  const [text, setText] = useState<string>("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // If browser does not suppor the sending that span
  if (!browserSupportsSpeechRecognition) {
    return <h1>Browser doesn't support speech recognition.</h1>;
  }

  // When any one submit, storing the text in mesageStore
  function handleSubmit(e: any) {
    e.preventDefault();
    const id: string = generateUniqueId();
    setMessages({ id, name: "User", msg: text });
    setMatch(matchetext(text));
    resetTranscript();
    setText("");
  };

  // Toggling color
  function handleVoiceBtn() {
    if (!listening) {
      SpeechRecognition.startListening();
      console.log("ok");
    } else {
      SpeechRecognition.stopListening();

      if (text) {
        setText(text + " " + transcript);
      }
      else (setText(transcript));
    };
  };

  return (
    <form
      className="h-1/6 flex justify-center items-center gap-3 hidden"
      onSubmit={handleSubmit}
      ref={form}
    >
      <textarea
        className="w-56 p-1"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div
        className={`h-10 w-10 flex justify-center items-center ${listening ? "text-teal-500 bg-yellow-950" : "text-white bg-black"} text-xl rounded-lg`}
        onClick={handleVoiceBtn}
      >
        <i className="ri-mic-line"></i>
      </div>

      <button
        type="submit"
        className="h-10 w-10 flex justify-center items-center text-white text-xl rounded-lg"
        style={{ background: "black" }}
      >
        <i className="ri-send-plane-2-fill"></i>
      </button>
    </form>
  );
};

export default Form;
