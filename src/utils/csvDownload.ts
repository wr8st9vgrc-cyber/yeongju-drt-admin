// UTF-8 BOM → Excel에서 한글 깨짐 방지
const BOM = '﻿'

function escapeCell(value: string | number): string {
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function downloadCSV(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
) {
  const content =
    BOM +
    [headers, ...rows]
      .map((row) => row.map(escapeCell).join(','))
      .join('\r\n')

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
