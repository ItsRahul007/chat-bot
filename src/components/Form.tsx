import { useRef, useState, useEffect } from "react";
import generateUniqueId from "../uniqueId/getId";
import "remixicon/fonts/remixicon.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type GreetProps = {
  setMessages: any | undefined;
  messages: any | undefined;
};

function Form(prop: GreetProps) {
  const { setMessages } = prop;
  const [text, setText] = useState("");
  const voiceBtn = useRef<HTMLDivElement>(null);

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
    setText("");
    resetTranscript();
  };

  // Toggling color
  function handleVoiceBtn() {
    if (!listening) {
      voiceBtn.current?.classList.add("text-emerald-500");
      voiceBtn.current?.classList.remove("text-white");
      SpeechRecognition.startListening();
      console.log("ok");
    } else {
      voiceBtn.current?.classList.add("text-white");
      voiceBtn.current?.classList.remove("text-emerald-500");
      SpeechRecognition.stopListening();

      console.log("off")
      console.log(transcript);
    };
  };

  return (
    <form
      className="h-1/6 flex justify-center items-center gap-3"
      onSubmit={handleSubmit}
    >
      <textarea
        className="w-56 p-1"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div
        className="h-10 w-10 flex bg-black justify-center items-center text-white text-xl rounded-lg"
        ref={voiceBtn}
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
}

export default Form;
