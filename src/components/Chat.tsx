import { useEffect, useRef } from "react";
import socket from "../socket/socket";

type GreetProps = {
  messages: any | undefined;
  addMsg: any | undefined;
};

function Chat(prop: GreetProps) {
  const msg_box: string = "min-h-fit p-2 m-2 max-w-xs min-w-fit block list-none";
  const left_msg: string = "bg-slate-500 float-left self-start";
  const right_msg: string = "bg-slate-700 float-right self-end";

  const ul = useRef<HTMLUListElement>(null);
  const li = useRef<HTMLLIElement>(null);

  const { messages, addMsg } = prop;

  // Function to scroll to bottom
  function scrollToBottom() {
    if (ul.current) {
      ul.current.scrollTop = ul.current.scrollHeight;
    }
  }

  function handlePickMood(e: any, mood: string) {
    document.getElementById("form")?.classList.remove("hidden")
    addMsg({ id: "1", name: "User", msg: e.target.innerText });
    li.current?.classList.add("hidden");
    socket.emit(mood);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div id="chat" className={`h-5/6 w-full`}>
      <ul
        ref={ul}
        className="overflow-y-scroll text-slate-100 flex flex-col gap-1 chat_con h-full w-full"
      >
        <li className={`${msg_box} ${left_msg}`}>
          Hello sir, How is your mood today?
        </li>
        <li className="h-14 mb-2" ref={li}>
          <button
            className="p-3 text-5xl"
            onClick={(e: any) => handlePickMood(e, "happy")}
          >
            😊
          </button>
          <button
            className="p-3 text-5xl"
            onClick={(e: any) => handlePickMood(e, "avarage")}
          >
            😐
          </button>
          <button
            className="p-3 text-5xl"
            onClick={(e: any) => handlePickMood(e, "sad")}
          >
            😓
          </button>
        </li>
        {messages &&
          messages.map((e: any, i: number) => {
            return (
              <li
                key={e.id}
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
