import Chat from './components/Chat';
import Form from './components/Form';
import { useState, useEffect } from "react";
import { useCustomHook } from './customHook/messageStore';
import socket from './socket/socket';
import generateUniqueId from './uniqueId/getId';

function App() {

  const { messages, addMsg } = useCustomHook();
  const [msg, setMsg] = useState(messages);

  // Updating the message variable whenever something new added in custom state
  useEffect(()=>{
    setMsg(messages);
  }, [messages]);

  // Listning the socket calls
  useEffect(() => {
    socket.on("mood", (e: any) => {
      const id: string = generateUniqueId();
      addMsg({id, name: "Bot", msg: e.msg});
    });

    socket.on("response", (e: any) => {
      const id: string = generateUniqueId();      
      addMsg({id, name: "Bot", msg: e.msg});
      console.log(e)
    });

    return () => {
      socket.off("mood");
      socket.off("response");
    };
    
  }, [socket]);
  

  return (
    <div className="h-screen w-screen flex justify-center bg-emerald-500 items-center">
      <div className="h-5/6 w-96 rounded-sm bg-gray-300 overflow-hidden p-2">
        <Chat addMsg={addMsg} messages={msg} />
        <Form setMessages={addMsg} messages={messages} />
      </div>
    </div>     
  );
}

export default App;
