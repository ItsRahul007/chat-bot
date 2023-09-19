import { useCustomHook } from "../customHook/messageStore";
import { useEffect, useRef } from "react";

type GreetProps = {
  messages: any | undefined;
};

function Chat(prop: GreetProps) {
  const msg_box: string = "min-h-fit p-2 max-w-xs min-w-fit block list-none";
  const left_msg: string = "bg-slate-500 float-left self-start";
  const right_msg: string = "bg-slate-700 float-right self-end";

  const ul = useRef<HTMLUListElement>(null)

  const { messages } = prop;

  // Function to scroll to bottom
  function scrollToBottom() {  
    if (ul.current) {
      ul.current.scrollTop = ul.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      id="chat"
      className={`h-5/6 w-full`}
    >
      <ul ref={ul} className="overflow-y-scroll text-slate-100 flex flex-col gap-1 chat_con h-full w-full">
        <li className={`${msg_box} ${left_msg}`}>Hello sir, How is your mood today?</li>
        {messages &&
          messages.map((e: any, i: number) => {
            return (
              <li
                key={i}
                className={`${msg_box} ${
                  e.name === "User" ? right_msg : left_msg
                }`}
              >
                {e.msg}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Chat;
