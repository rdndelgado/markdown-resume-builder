import os
from openai import OpenAI

SYSTEM_PROMPT = (
    "You are a professional resume writer. Your job is to improve resume content to be "
    "more impactful, quantified, and achievement-focused. Use strong action verbs. Keep "
    "it concise. Do not invent facts — only enhance what the user provides. Return only "
    "the improved text, no explanation."
)


def improve_text(text: str, context: str = "", field: str = "bullet") -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY is not set")

    client = OpenAI(api_key=api_key)

    user_message = text
    if context:
        user_message = f"Context: {context}\n\nText to improve: {text}"

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.7,
        max_tokens=300,
    )

    return response.choices[0].message.content.strip()
