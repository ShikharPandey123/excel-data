# Excel Data Importer

## 📌 Project Overview
The **Excel Data Importer** is a web application that allows users to upload `.xlsx` files, preview the data, handle validation errors, and import valid rows into a database. It features drag-and-drop file uploads, error handling with modals, and a paginated data preview.

---

## 🚀 Features

### 🔹 **File Upload**
- Supports drag-and-drop file uploads with a fallback file input button.
- Accepts only `.xlsx` files with a maximum file size of **2MB**.

### 🔹 **Error Handling**
- Displays validation errors in a **modal dialog**.
- Errors include **row number** and a **description** of the issue.
- For files with multiple sheets, errors are categorized into **separate tabs**.

### 🔹 **Data Preview**
- Dropdown to select and preview sheets from the uploaded file.
- Displays sheet data in a **paginated table**.
- Formats:
  - **Dates:** `DD-MM-YYYY`
  - **Numbers:** Indian number format (e.g., `12,34,456.00`).
- Row deletion with **confirmation prompts**.

### 🔹 **Data Import**
- **Imports all valid rows** into the database while skipping invalid rows.
- Shows a **success message** after a successful import.
- Highlights skipped rows for further review.

---

## 🛠️ Tech Stack

| Technology       | Usage |
|-----------------|--------|
| **React.js**    | Frontend UI |
| **TypeScript**  | Type safety and maintainability |
| **React-Paginate** | Pagination for data preview |
| **Tailwind CSS** | UI styling |
| **SheetJS (xlsx)** | Excel file parsing |
| **React Dropzone** | Drag-and-drop file upload |
| **React Modal** | Error display modal |
| **Node.js & Express** | Backend API (if applicable) |
| **MongoDB** | Database for storing valid data |

---


