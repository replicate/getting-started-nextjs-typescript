import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {

  const data = await req.formData();
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const prediction = await replicate.predictions.create({
    // Pinned to a specific version of Stable Diffusion
    // See https://replicate.com/stability-ai/sdxl
    version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",

    // This is the text prompt that will be submitted by a form on the frontend
    input: { prompt: data.get("prompt") },
  });

  if (prediction?.error) {
    return new Response(
      JSON.stringify({ detail: prediction.error.detail }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify(prediction),
    { status: 201 }
  );
}