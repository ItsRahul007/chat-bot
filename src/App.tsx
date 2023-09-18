import './App.css';
import Chat from './components/Chat';
import Form from './components/Form';
import { useState, useEffect } from "react";
import { useCustomHook } from './customHook/messageStore';

interface Item {
  id: string;
  name: string;
  msg: string | undefined
};


function App() {
  // const [messages, setMessages] = useState<Item[]>([{id: "1", name: "Bot", msg: "Hello sir, How is your mood today?"}]);

  const { messages, addMsg } = useCustomHook();
  const [msg, setMsg] = useState(messages);

  useEffect(()=>{
    setMsg(messages);
  }, [addMsg]);

  return (
    <div className="h-screen w-screen flex justify-center bg-emerald-500 items-center">
      <div className="h-5/6 w-96 rounded-sm bg-gray-300 overflow-hidden p-2">
        <Chat messages={msg} />
        <Form setMessages={addMsg} messages={messages} />
      </div>
    </div>     
  );
}

export default App;
