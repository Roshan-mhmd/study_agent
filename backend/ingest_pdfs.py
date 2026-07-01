import os

from app.services.document_service import process_document

DOCUMENTS_FOLDER = "documents"

if not os.path.exists(DOCUMENTS_FOLDER):
    print("Documents folder not found!")
    exit()

for file_name in os.listdir(DOCUMENTS_FOLDER):

    if file_name.lower().endswith(".pdf"):

        file_path = os.path.join(
            DOCUMENTS_FOLDER,
            file_name
        )

        print(
            f"\nProcessing: {file_name}"
        )

        try:

            process_document(
                file_path
            )

            print(
                f"Completed: {file_name}"
            )

        except Exception as e:

            print(
                f"Failed: {file_name}"
            )

            print(e)

print("\nAll PDFs processed.")