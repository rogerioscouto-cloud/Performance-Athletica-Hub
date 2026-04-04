import * as XLSX from "xlsx";
import type { RawRow } from "@/domain/imports/types";

export function parseXlsx(file: File): Promise<RawRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const result = event.target?.result;

        if (!(result instanceof ArrayBuffer)) {
          reject(new Error("Falha ao ler o arquivo XLSX."));
          return;
        }

        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) {
          reject(new Error("Arquivo XLSX sem planilhas."));
          return;
        }

        const sheet = workbook.Sheets[firstSheetName];

        if (!sheet) {
          reject(new Error("Não foi possível acessar a primeira planilha."));
          return;
        }

        const json = XLSX.utils.sheet_to_json(sheet);
        resolve(json as RawRow[]);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo."));
    };

    reader.readAsArrayBuffer(file);
  });
}
