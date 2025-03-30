export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  const scriptURL = "https://script.google.com/macros/s/AKfycbxhM_eUtIqG-zo3IKW4yeOCbhrcXQNQ92w94vxNMX9GvaWnNm0Ut5YJgRoAoccuXZw/exec";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error: " + error.message
    };
  }
}
