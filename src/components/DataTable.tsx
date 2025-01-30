import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./DataTable.module.css";

interface DataTableProps {
  data: any[];
  onDeleteRow: (index: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onDeleteRow }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB");
  const formatNumber = (num: number) => num.toLocaleString("en-IN");

  const handlePageClick = ({ selected }: { selected: number }) =>
    setCurrentPage(selected);

  if (!data.length) return <p>No data available</p>;

  // Separate header and table data
  const headers = data[0]; 
  const tableData = data.slice(1);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            {headers.map((col: string, index: number) => (
              <th key={index} className={styles.th}>
                {col}
              </th>
            ))}
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData
            .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
            .map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tr}>
                {row.map((cell: any, cellIndex: number) => (
                  <td key={cellIndex} className={styles.td}>
                    {typeof cell === "number"
                      ? formatNumber(cell)
                      : typeof cell === "string" && !isNaN(Date.parse(cell))
                      ? formatDate(cell)
                      : cell}
                  </td>
                ))}
                <td className={styles.td}>
                  <button
                    onClick={() =>
                      onDeleteRow(rowIndex + currentPage * rowsPerPage)
                    }
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ReactPaginate
        className={styles.pagination}
        pageCount={Math.ceil(tableData.length / rowsPerPage)}
        onPageChange={handlePageClick}
        activeClassName={styles.activePage}
      />
    </div>
  );
};

export default DataTable;
