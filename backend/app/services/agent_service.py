from app.services.llm_service import client

def should_retrieve(question):

    prompt = f"""
You are a routing agent.

Determine if the user's question requires searching institutional documents.

Respond ONLY with:

YES

or

NO

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

    decision = (
        response.choices[0]
        .message.content
        .strip()
        .upper()
    )

    return decision == "YES"