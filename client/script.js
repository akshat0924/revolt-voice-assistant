const apiKey = "AIzaSyA3MWjuquHM5R_sqdIFWp-Zb97WlwUwyA0";  // ✅ Use only once globally

const button = document.getElementById("start");
const transcriptDiv = document.getElementById("transcript");

button.addEventListener("click", () => {
  const recognition = new webkitSpeechRecognition(); // Chrome specific
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const speech = event.results[0][0].transcript;
    transcriptDiv.innerText = "You: " + speech;
    askGemini(speech);
  };
});

function askGemini(userText) {
  fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userText }] }],
      systemInstruction: {
        parts: [{ text: "You are Rev, a helpful assistant for Revolt Motors. Only talk about Revolt Motors." }]
      }
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("🧠 Gemini response:", data);  // ✅ DEBUG log
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that.";
      const speak = new SpeechSynthesisUtterance(reply);
      speechSynthesis.speak(speak);
    });
}
