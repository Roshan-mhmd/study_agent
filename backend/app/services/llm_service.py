import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_answer(
    question,
    context,
    history=""
):

    prompt = f"""
You are Campus AI.

Use the retrieved context to answer.

Use conversation history to understand follow-up questions.

If the answer is not found in the retrieved context, say:

'I could not find this information in the uploaded documents.'

Conversation History:
{history}

Retrieved Context:
{context}

Question:
{question}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response.choices[0].message.content


def general_answer(
    question,
    history=""
):

    response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "system",
            "content": """
You are Campus AI, a helpful college assistant.

Use conversation history when relevant.
If the current question refers to a previous topic,
continue the conversation naturally.
"""
        },
        {
            "role": "user",
            "content": f"""
Conversation History:
{history}

Question:
{question}
"""
        }
    ]
)

    return (
        response
        .choices[0]
        .message.content
    )