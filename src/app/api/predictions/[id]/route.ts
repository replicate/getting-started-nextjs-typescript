export async function GET(request: Request,
  { params }: { params: { id: string } }) {
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + params.id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    }
  );
  if (response.status !== 200) {
    let error = await response.json();
    return new Response(
      JSON.stringify({ detail: error.detail }),
      { status: 500 }
    );
  }

  const prediction = await response.json();
  return new Response(
    JSON.stringify(prediction),
    { status: 200 }
  );
}