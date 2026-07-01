from app.services.rag_service import ask_question

question = input("Question: ")

answer = ask_question(question)

print("\nAnswer:")
print(answer)