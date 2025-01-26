import { Tools } from "./components/Tools.tsx";
import { FileUploader } from "./components/FileUploader.tsx";
import { DataProvider } from "./contexts/DataContext.tsx";
import { Instructions } from "./components/Instructions.tsx";
import { PreviewV2 } from "./components/PreviewV2.tsx";

function App() {
  return (
    <DataProvider>
      <div className="app">
        <FileUploader />
        <Tools />
        <PreviewV2 />
        <Instructions />
      </div>
    </DataProvider>
  );
}

export default App;
