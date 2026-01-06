// src/components/common/DataTable.jsx
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const DataTable = ({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick = null,
  sortColumn = null,
  sortDirection = 'asc',
  onSort = null,
}) => {
  const handleSort = (column) => {
    if (!onSort || !column.sortable) return;

    const newDirection =
      sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.key, newDirection);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="text-lg font-medium">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full text-white">
        <thead className="bg-gray-700 border-b border-gray-600">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left text-gray-300 ${
                  column.sortable && onSort ? 'cursor-pointer hover:bg-gray-600' : ''
                }`}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.title}</span>
                  {column.sortable && sortColumn === column.key && (
                    sortDirection === 'asc' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className={`border-b border-gray-700 hover:bg-gray-750 ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className="text-gray-200">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
