import { ImportUploader } from "@/features/import/import-uploader";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Importar XLSX</h1>
      <ImportUploader />
    </div>
  );
}
