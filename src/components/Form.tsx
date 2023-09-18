import { useRef } from "react";
import generateUniqueId from "../uniqueId/getId";
import 'remixicon/fonts/remixicon.css'
import { useCustomHook } from "../customHook/messageStore";

type GreetProps = {
  setMessages: any | undefined;
  messages: any | undefined;
}

function Form(prop: GreetProps) {
  const text = useRef<HTMLTextAreaElement>(null); // Defining the type of ref
  const { setMessages, messages } = prop;

  function handleSubmit(e: any) {
    e.preventDefault();
    const id: string = generateUniqueId();
    setMessages({id, name: "User", msg: text.current?.value});
  };

  return (
    <form
      className="h-1/6 flex justify-center items-center gap-3"
      onSubmit={handleSubmit}
    >
      <textarea ref={text} className="w-56 p-1" required></textarea>
      <button className="h-10 w-10 flex bg-black justify-center items-center text-white text-xl">
        <i className="ri-mic-line"></i>
      </button>
      <button type="submit"
       className="h-10 w-10 flex bg-black justify-center items-center text-white text-xl"
      >
        <i className="ri-send-plane-2-fill"></i>
      </button>
    </form>
  );
};

export default Form;
