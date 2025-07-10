export async function handler(event, context) {
  const apiUrl = 'https://api.cnb.cz/cnbapi/exrates/daily';
  try {
    const response = await fetch(apiUrl, { headers: { accept: "application/json" } });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Chyba při získávání dat z ČNB" }),
    };
  }
}