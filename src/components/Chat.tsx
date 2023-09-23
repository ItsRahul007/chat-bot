import { useEffect, useRef } from "react";
import socket from "../socket/socket";

type GreetProps = {
  messages: any | undefined;
  addMsg: any | undefined;
  form: any | undefined;
  button: any | undefined;
  remove: any | undefined;
  summary: any | undefined;
  addSummary: any | undefined;
  clearSummary: any | undefined;
};

function Chat(prop: GreetProps) {
  const msg_box: string = "min-h-fit p-2 m-2 max-w-xs min-w-fit block list-none";
  const left_msg: string = "bg-slate-500 float-left self-start";
  const right_msg: string = "bg-slate-700 float-right self-end";

  const ul = useRef<HTMLUListElement>(null);
  const li = useRef<HTMLLIElement>(null);
  const liSum = useRef<HTMLLIElement>(null);

  const { messages, addMsg, form, button, remove, summary, addSummary, clearSummary } = prop;

  // Function to scroll to bottom
  function scrollToBottom() {
    if (ul.current) {
      ul.current.scrollTop = ul.current.scrollHeight;
    };
  };

  // When user click on any emoji hiding the li and unhiding the text input filed
  function handlePickMood(e: any, mood: string) {
    form.current?.classList.remove("hidden");
    addMsg({ id: "1", name: "User", msg: e.target.innerText });
    li.current?.classList.add("hidden");
    socket.emit(mood);
    addSummary(mood);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function acceptReject(arg: string) {
    button.current?.classList.add("hidden");
    if (arg === "accept") {
      liSum.current?.classList.remove("hidden");
    } else {
      remove();
      li.current?.classList.remove("hidden");
      clearSummary();
    }
  };

  return (
    <div id="chat" className={`h-5/6 w-full`}>
      <ul
        ref={ul}
        className="overflow-y-scroll text-slate-100 flex flex-col gap-1 chat_con h-full w-full"
      >
        <li className={`${msg_box} ${left_msg}`}>
          Hello sir, How is your mood today?
        </li>
        <li className="h-14 mb-2 flex justify-center items-center" ref={li}>
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
                className={`${msg_box} ${e.name === "User" ? right_msg : left_msg
                  }`}
              >
                {e.msg}
              </li>
            );
          })}

        <li className="w-full h-14 flex justify-center items-center gap-5 mt-4 hidden" ref={button}>
          <button className="bg-green-600 p-2 rounded-lg font-medium" onClick={() => acceptReject("accept")}>Accept</button>
          <button className="bg-red-600 p-2 rounded-lg font-medium" onClick={() => acceptReject("reject")}>Reject</button>
        </li>

        <li className={`${msg_box} bg-orange-500 w-full hidden`} ref={liSum}>
          <h2 className="w-full text-center font-semibold text-2xl">Summary</h2>
          <div>
            At first I asked your mood. And you told me that your current mood is {summary[0]}. After that you told me to tell a {summary[1]}, and I provide you a {summary[1]}
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Chat;
