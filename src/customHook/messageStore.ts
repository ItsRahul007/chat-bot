import { useState } from 'react';

interface Item {
  id: string;
  name: string;
  msg: string | undefined
};

export function useCustomHook() {
  // Define the initial state as an array of objects
  const [messages, setMsg] = useState<Item[]>([]);

  // Add functions to manipulate the state as needed
  const addMsg = (newItem: Item) => {
    setMsg([...messages, newItem]);
  };

  const removeMsg = (id: string) => {
    const updatedItems = messages.filter((item) => item.id !== id);
    setMsg(updatedItems);
  };

  // Return the state and functions to components that use this hook
  return {
    messages,
    addMsg,
    removeMsg,
  };
}
