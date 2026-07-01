from app.services.question_splitter import split_questions

print(
    split_questions(
        "What is the fee structure, who is the principal and what companies visit the campus?"
    )
)