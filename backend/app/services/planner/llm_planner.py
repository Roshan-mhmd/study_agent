import os
import json

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def llm_plan(question, history=""):

    prompt = f"""
    You are an AI planning agent.

    Your job is NOT to answer the question.

    Your only job is to decide which tool should answer it.

    Available tools:

    1 . knowledge_base
    - College PDFs
    - Website embeddings
    - Fees
    - Hostel
    - Placement
    - Principal
    - Faculty
    - Departments
    - Admission
    - Exam
    - Regulations

    2. website
    Use ONLY if the knowledge base might be outdated or missing information.

    3. general
    For programming, AI, Python, Java, React, SQL, mathematics and general knowledge.

    Return ONLY valid JSON.

    Example:

    {{
    "strategy":"knowledge_base"
    }}  

    or

    {{
    "strategy":"website"
    }}

    or

    {{
    "strategy":"knowledge_base_then_website"
    }}

    or

    {{
    "strategy":"general"
    }}

    Question:

    {question}

    History:

    {history}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    try:
        return json.loads(
            response.choices[0].message.content
        )

    except Exception:

        return {
            "strategy": "knowledge_base"
        }