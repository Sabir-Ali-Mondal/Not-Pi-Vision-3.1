// ===========================================
// API EXECUTION LOGIC (Updated for new server.js)
// ===========================================

/**
 * Executes a prompt against your server's AI engine.
 * Supports:
 *  - Gemini normal response
 *  - Gemini streaming response
 *  - ChatGPT "manual" search fallback
 */
async function executePrompt(promptText, aiEngine = 'gemini', buttonElement = null) {

    // -------------------------------
    // ChatGPT fallback (manual search)
    // -------------------------------
    if (aiEngine === 'chatgpt' || aiEngine === 'perplexity') {
        const searchUrl = aiEngine === 'perplexity'
            ? `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`
            : `https://www.perplexity.ai/?q=${encodeURIComponent(promptText)}`;
        window.open(searchUrl, '_blank', 'width=800,height=600');
        return { success: true, manual: true };
    }

    // -------------------------------
    // Gemini API via your server.js
    // POST /api/generate  (normal)
    // POST /api/generate/stream  (streaming)
    // -------------------------------
    if (aiEngine === 'gemini') {

        if (buttonElement) {
            buttonElement.disabled = true;
            buttonElement.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Generating...';
        }

        try {
            // The frontend always calls the SAME endpoint.
            // The server decides: normal or streaming based on the model used.
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: promptText })
            });

            // -------------------------------
            // STREAMING RESPONSE HANDLING
            // If server returns:  Content-Type: text/event-stream
            // -------------------------------
            const contentType = response.headers.get("Content-Type") || "";

            if (contentType.includes("text/event-stream")) {

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullText = "";

                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    fullText += chunk;

                    // Dispatch event so UI can show streaming text
                    document.dispatchEvent(new CustomEvent("gemini-stream", {
                        detail: { chunk }
                    }));
                }

                if (buttonElement) {
                    buttonElement.disabled = false;
                    buttonElement.innerHTML = '<i class="bi bi-stars"></i> <span>Generate</span>';
                }

                return { success: true, streaming: true, content: fullText };
            }

            // -------------------------------
            // NORMAL JSON RESPONSE
            // -------------------------------
            const data = await response.json();

            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.innerHTML = '<i class="bi bi-stars"></i> <span>Generate</span>';
            }

            return { success: true, streaming: false, content: data.content };

        } catch (err) {
            console.error(err);

            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.innerHTML = '<i class="bi bi-stars"></i> <span>Generate</span>';
            }

            return { success: false, error: err.message };
        }
    }
}
