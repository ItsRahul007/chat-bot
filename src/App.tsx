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
  }, [addMsg]);

  // Listning the socket calls
  useEffect(() => {
    socket.on("mood", (e: any) => {
      // addMsg({id: generateUniqueId(), name: "Bot", msg: e.msg})
      console.log(e);
    });

    socket.on("hello", ()=>{
      console.log("listning")
    })

  }, [socket]);
  

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
