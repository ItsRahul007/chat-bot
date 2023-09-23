import { useState } from 'react';

interface Item {
  id: string | undefined;
  name: string | undefined;
  msg: string | undefined;
};

export function useCustomHook() {
  // Define the initial state as an array of objects
  const [messages, setMsg] = useState<Item[]>([]);

  const addMsg = (newItem: Item) => {
    setMsg((prevMessages) => [...prevMessages, newItem]);
  };  

  const remove = () => {
    setMsg([]);
  };

  // Return the state and functions to components that use this hook
  return {
    messages,
    addMsg,
    remove,
  };
};
