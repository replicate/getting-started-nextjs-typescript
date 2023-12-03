"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {

  type PromptFormEvent = React.FormEvent<HTMLFormElement> & {
    target: { prompt: { value: string } };
  };

  type Prediction = { output: string, status: string, id: string } | null;

  const [prediction, setPrediction] = useState<Prediction>(null);
  const [error, setError] = useState(null);


  const handleSubmit = async (e: PromptFormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('prompt', e.target.prompt.value);

    const response = await fetch("/api/predictions", {
      method: "POST",
      body: formData,
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id, { cache: 'no-store' });
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction })
      setPrediction(prediction);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex bg-white p-10 border-solid border-2 border-gray-300 rounded-3xl">
        <Head>
          <title>Replicate + Next.js</title>
        </Head>

        <p className="mb-4 text-lg text-gray-700">
          Dream something with{" "}
          <a href="https://replicate.com/stability-ai/stable-diffusion" className="text-blue-500 hover:underline">
            SDXL
          </a>:
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <input
            type="text"
            name="prompt"
            placeholder="Enter a prompt to display an image"
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 mt-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go!
          </button>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {prediction && (
          <div className="mt-4">
            {prediction.output && (
              <div className="flex flex-col items-center justify-center w-full">
                <Image
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-md border-gray-300"
                />
              </div>
            )}
            <p className="mt-4 text-lg text-gray-700">status: {prediction.status}</p>
          </div>
        )}
      </div>
    </main>
  )
}
