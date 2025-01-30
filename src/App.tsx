import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
import ErrorModal from "./components/ErrorModal";
import "./App.css";

const App: React.FC = () => {
  const [sheets, setSheets] = useState<{ name: string; data: any[] }[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ row: number; message: string }[]>([]);

  const handleFileUpload = (sheets: { name: string; data: any[] }[]) => {
    setSheets(sheets);
    setSelectedSheet(sheets[0]?.name || null);
  };

  const handleDeleteRow = (index: number) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      setSheets((prevSheets) =>
        prevSheets.map((sheet) =>
          sheet.name === selectedSheet
            ? {
                ...sheet,
                data: [sheet.data[0], ...sheet.data.slice(1, index + 1), ...sheet.data.slice(index + 2)],
              }
            : sheet
        )
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <FileUpload onFileUpload={handleFileUpload} />
      {sheets.length > 0 && (
        <>
          <select
            className="mt-4 p-2 border"
            onChange={(e) => setSelectedSheet(e.target.value)}
          >
            {sheets.map((sheet, index) => (
              <option key={index} value={sheet.name}>
                {sheet.name}
              </option>
            ))}
          </select>
          {selectedSheet && (
            <DataTable
              data={sheets.find((sheet) => sheet.name === selectedSheet)?.data || []}
              onDeleteRow={handleDeleteRow}
            />
          )}
        </>
      )}
      {errors.length > 0 && <ErrorModal errors={errors} onClose={() => setErrors([])} />}
    </div>
  );
};

export default App;
