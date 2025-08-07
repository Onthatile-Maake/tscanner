#importing necessary libraries
import zipfile
import csv
import os

#files
zip_file_path="C:\Users\ontha\Downloads\archive (3).zip"
csv_file_path= 'extracted_ts_and_cs.csv'

with open(csv_file_path, "w", newlines="", encoding="utf-8") as csvfile:
#writer object
    csv_writer=csv.writer(csvfile)
#header row
    csv_writer.writerow(['Document_Name', 'Text_Content'])
with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
    for file_name in zip_ref.namelist():
        
        if file_name.endswith(".txt")
        print(f"extracting content from: {file_name}")
        try:
            #getting content from the file
            with zip_ref.open(file_name) as file:
                text_content = file.read().decode("utf-8")

                #new row in csv
                csv_writer.writerow([os.path.basename(file_name), text_content])

        except Exception as e:
            print(f"Could not read {file_name}: {e}")
