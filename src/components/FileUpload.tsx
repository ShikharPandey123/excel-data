import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ExcelJS from "exceljs";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  onFileUpload: (sheets: { name: string; data: any[] }[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    // File Validation
    if (!file.name.endsWith(".xlsx")) {
      setError("Only .xlsx files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be under 2 MB.");
      return;
    }

    // Read file as ArrayBuffer (ExcelJS requires this format)
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const sheets = workbook.worksheets.map((sheet) => {
          // Extract sheet data as JSON (excluding empty rows)
          const data: any[] = sheet.getSheetValues().filter((row) => row !== null);
          return { name: sheet.name, data };
        });

        onFileUpload(sheets);
        setError(null);
      } catch (err) {
        setError("Error reading the Excel file.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.container}>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        <p>Drag & drop an .xlsx file here, or click to select one</p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FileUpload;
