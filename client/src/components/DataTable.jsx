export default function DataTable({ columns, data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.key} className={col.className || ''}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            <td className="flex">
              {onEdit && (
                <div className="button-border orange-gradient">
                  <button className="button small-button" onClick={() => onEdit(row)}>
                    Edit
                  </button>
                </div>
              )}
              {onDelete && (
                <div className="button-border red-gradient">
                  <button className="button small-button" onClick={() => onDelete(row.id)}>
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
