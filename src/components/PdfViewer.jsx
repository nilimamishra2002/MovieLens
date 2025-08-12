import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function PDFViewer() {
  const plugin = defaultLayoutPlugin();

  return (
    <div style={{ height: "100vh" }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        <Viewer fileUrl="/MovieLenseDashboard.pdf" plugins={[plugin]} />
      </Worker>
    </div>
  );
}

export default PDFViewer;
