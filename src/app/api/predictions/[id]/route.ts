import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function GET(request: Request,
  { params }: { params: { id: string } }) {
  const prediction = await replicate.predictions.get(params.id);

  if (prediction?.error) {
    return new Response(
      JSON.stringify({ detail: prediction.error.detail }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify(prediction),
    { status: 200 }
  );
}