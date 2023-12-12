interface TableProps {
  data: {
    headers: string[]
    rows: string[][]
  }
}

const Table: React.FC<TableProps> = ({ data }) => {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>)
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default Table
