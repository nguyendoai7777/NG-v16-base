import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface ExportXLSXProps<T = any> {
  header: string[][];
  data: T[];
  filename?: string;
}

@Injectable()
export class ExportFileService {
  exportExcel({
    filename = `file_${Date.now()}`,
    data = [],
  }: Omit<ExportXLSXProps, 'header'>) {
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_json(ws, data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  exportExcelWithHeader({
    header,
    data,
    filename = 'cms-export',
  }: ExportXLSXProps) {
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, header);
    XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }
}
