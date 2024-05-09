'use client'

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Home() {
  let s1 : string = "This is a label 1"
  let s2 : string = "This is a label 2"

  const [result, setResult] = useState<string>("")

  async function getResult(event : FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const inp = formData.get('input')
    // console.log(inp)
    setResult(inp == undefined ? "" : inp.toString())
  }

  return (
    <main className="text-center">
      <div className="pt-5">
        <p> {s1} </p>
        <p> {s2} </p>
      </div>
      <form onSubmit={getResult} className="pt-5">
        <input type="text" name="input" placeholder="Input your text" className="border border-black"/> 
        <br/>
        <button type="submit" className="mt-2 border rounded-lg border-black">
          Do something
        </button>
      </form>
      <div className="pt-2">
        <p> {result} </p>
      </div>
    </main>
  );
}
