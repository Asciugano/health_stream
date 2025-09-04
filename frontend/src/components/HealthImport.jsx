import React, { useState } from "react";
import axios from "axios";
import { Upload, Loader, MoreVertical } from "lucide-react"

function HealthImport({ setMetrics, metrics, userID }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleFileChange = (e) => {
    e.prefentDefalult();
    setFile(e.target.files[0]);
  }

  const handleUpload = async (e) => {
    e.prefentDefalult();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userID", userID);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/health/import", formData, {
        headers: { "Content-Type": "multipart/formData" },
      });

      setMetrics([...metrics, res.data.imported]);
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 w-full">
      {/* Help Button */}
      <button
        type="button"
        onClick={() => setShowHelp(!showHelp)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
        <MoreVertical size={20} />
        <span className="text-sm">Come ottenere i file da caricare</span>
      </button>

      {/* Instruction Box */}
      {showHelp && (
        <div className="mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-700 space-y-1 w-full max-w-md">
          <p>📱 Apri l'app <strong>Salute</strong> sul tuo iPhone</p>
          <p>👤 Vai su <strong>Profilo → Esporta dati sanitari</strong></p>
          <p>⬇️ Verra generato un file <code>export.zip</code></p>
          <p>📤 Caricalo qui sotto per importare i dati</p>
        </div>
      )}

      {/* Import Form */}
      <form onSubmit={handleUpload} className="p-4 bg-white shadow rounded-lg w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Importa Dati</h3>
        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded-lg p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? <Loader className="animate-spin" size={18} /> : <Upload size={18} />}
          {loading ? "Importando..." : "Importa Dati"}
        </button>
      </form>
    </div>
  );
}

export default HealthImport;
