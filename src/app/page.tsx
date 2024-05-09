'use client'

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Console } from "./resource/console";

export default function Home() {
  let game: Console = new Console();
  const [gold, updateGold] = useState<string>(game.getHouse().getGold().getDisplay());
  const [elixir, updateElixir] = useState<string>(game.getHouse().getElixir().getDisplay());

  const [currentState, updateCurrentState] = useState<string[]>(game.getHouse().getInfo());

  const [result, setResult] = useState<string[]>([])
  function setSetResult(add: string): string[] {
    let temp : string[] = result;
    temp.push(add);
    return temp;
  }

  async function getResult(event : FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const inp = formData.get('input')
    // console.log(inp)
    let res = game.handleOrder(inp == undefined ? "" : inp.toString());
    if (res == null) setResult(setSetResult("Operation success!"));
    else setResult(setSetResult(res));
    // setResult(inp == undefined ? "" : inp.toString())
  }

  function updateSecond() {
    game.getHouse().updateSecond();
    updateGold(game.getHouse().getGold().getDisplay());
    updateElixir(game.getHouse().getElixir().getDisplay());
    updateCurrentState(game.getHouse().getInfo());
  }

  // const timer = setTimeout(() => {
  //   updateSecond()
  // }, 1000);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('This will run every second!');
      updateSecond();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="text-center">
      <div className="pt-5">
        <p> {"Current gold: " + gold} </p>
        <p> {"Current elixir: " + elixir} </p>
        <hr/>
        {
          // currentState
          currentState.map((str, index) => (
            <p>{str}</p>
          ))
        }
        
        <hr/>
        <p> {
          result.map((str, index) => (
            <p>{str}</p>
          ))
        } </p>
      </div>
      <form onSubmit={getResult} className="pt-5">
        <input type="text" name="input" placeholder="Input your text" className="border border-black"/> 
        <br/>
        <button type="submit" className="mt-2 border rounded-lg border-black">
          Do something
        </button>
      </form>
    </main>
  );
}
