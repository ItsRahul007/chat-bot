import Chat from './components/Chat';
import Form from './components/Form';
import { useState, useEffect, useRef } from "react";
import { useCustomHook } from './customHook/messageStore';
import socket from './socket/socket';
import generateUniqueId from './uniqueId/getId';
import { useQuery } from 'react-query';
import axios from 'axios';
import useSummary from './customHook/summary';

function App() {

  const { messages, addMsg, remove } = useCustomHook();
  const [msg, setMsg] = useState(messages);
  const [match, setMatch] = useState<string>("");
  const form = useRef<HTMLFormElement>(null);
  const button = useRef<HTMLLIElement>(null);

  const { summary, addSummary, clearSummary } = useSummary();

  // Updating the message variable whenever something new added in custom state
  useEffect(() => {
    setMsg(messages);
  }, [messages]);

  // Listning the socket calls
  useEffect(() => {
    socket.on("mood", (e: any) => {
      const id: string = generateUniqueId();
      addMsg({ id, name: "Bot", msg: e.msg });
    });

    return () => {
      socket.off("mood");
      socket.off("response");
      socket.off("failed");
    };

  }, [socket]);

  async function fetchData(req: string) {
    const url = `http://localhost:8080/${req}`;
    try {
      const { data } = await axios.get(url);
      return await data;
    } catch (error) {
      console.log(error);
    };
  };

  const { data } = useQuery("data", () => fetchData(match), {
    enabled: !!match, // Only fetch data when match is not empty
  });

  useEffect(() => {
    if (data) {
      addMsg({ id: data?.id, name: "Bot", msg: data?.main });
      setMatch("");
      form.current?.classList.add("hidden");
      button.current?.classList.remove("hidden");
      addSummary(match);
    };
  }, [data]);

  return (
    <div className="h-screen w-screen flex justify-center bg-emerald-500 items-center">
      <div className="h-5/6 w-96 rounded-sm bg-gray-300 overflow-hidden p-2">
        <Chat addMsg={addMsg} remove={remove} messages={msg} form={form} button={button} summary={summary} addSummary={addSummary} clearSummary={clearSummary} />
        <Form setMessages={addMsg} messages={messages} form={form} setMatch={setMatch} />
      </div>
    </div>
  );
};

export default App;
