
# Import necessary libraries
import zipfile
import csv
import os

# File paths
zip_file_path = "C:\\Users\\ontha\\Downloads\\archive (3).zip"
csv_file_path = "extracted_ts_and_cs.csv"

# Minimum file size in KB
min_file_size_kb = 50  # 50 KB

with open(csv_file_path, "w", newline="", encoding="utf-8") as csvfile:
    csv_writer = csv.writer(csvfile)
    # Write header to the CSV file
    csv_writer.writerow(["Document_Name", "Text_Content"])
    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
        for file_name in zip_ref.namelist():
            # Check if the file is a text or markdown file
            if file_name.endswith(".txt") or file_name.endswith(".md"):
                info = zip_ref.getinfo(file_name)
                # Check if the file size is strictly greater than the minimum threshold
                file_size_kb = info.file_size / 1024
                if file_size_kb <= min_file_size_kb:
                    print(f"Skipping {file_name} (size: {file_size_kb:.2f} KB)")
                    continue
                print(f"Extracting content from: {file_name} ({file_size_kb:.2f} KB)")
                try:
                    with zip_ref.open(file_name) as file:
                        # Read the file content
                        text_content = file.read().decode("utf-8")
                        csv_writer.writerow([os.path.basename(file_name), text_content])
                except Exception as e:
                    print(f"Could not read {file_name}: {e}")

