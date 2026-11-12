const API_KEY = "";

const askButton = document.getElementById("askBtn");
const result = document.getElementById("result");
const promptInput = document.getElementById("prompt");

askButton.addEventListener("click", async function () {

    const prompt = promptInput.value;

    if (prompt === "") {
        result.innerText = "Please enter a question.";
        return;
    }

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            result.innerText = data.error?.message || "Something went wrong.";
            return;
        }

        result.innerText =
            data.candidates[0].content.parts[0].text;

    } catch (error) {

        console.error(error);
        result.innerText = "Error: " + error.message;

    }
});