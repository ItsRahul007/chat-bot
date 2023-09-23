import { useState, useRef } from "react";
import { toast } from "react-toastify";

function Greet() {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  const date = new Date();
  const hours: string = date.getHours().toString().padStart(2, '0');
  const minutes: string = date.getMinutes().toString().padStart(2, '0');
  
  const greet = () => toast("Welcome to Chat Bot " + value + " " + `${hours}:${minutes}`);

  function handleSubmit(e: any){
    e.preventDefault();
    greet();
    ref.current?.classList.add("hidden");
  };

  return (
    <div className='h-full w-full absolute greet flex justify-center items-center' ref={ref}>
      <form className="flex h-40 w-44 flex-col justify-center items-center bg-green-500" onSubmit={handleSubmit}>
        <input type="text" className="bg-slate-900 text-white w-32 h-7 p-2" value={value} onChange={e => setValue(e.target.value)} required />
        <button type="submit" className="h-5 w-7 rounded-md mt-1 bg-red-300">ok</button>
      </form>
    </div>
  )
}

export default Greet;