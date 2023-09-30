//API DO WHATSAPP - hide request

// pages/api/externalRequest.js

// Import any necessary modules or libraries here

export default async function handlerWhatsappConnection({ req, res }: any) {
  try {
    // Make the external HTTP request here
    const response = await fetch("https://example.com/api/data"); // Replace with your external URL
    const data = await response.json();

    // Return the data to the client
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// In your client-side code

async function sendMessage({message, to}: {message: string, to: string}) {
  try {
    const response = await fetch("/api/externalRequest");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}