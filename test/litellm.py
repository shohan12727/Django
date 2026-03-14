import litellm
import os

os.environ["OLLAMA_API_BASE"] = "http://localhost:11434"

response = litellm.completion(
    model="ollama/llama3.1",
    messages=[
        {
            "role": "user",
            "content": "Explain quantum entanglement in simple terms."
        }
    ]
)

print(response.choices[0].message.content)