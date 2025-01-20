import { Tools } from "./components/Tools.tsx";
import { Preview } from "./components/Preview.tsx";
import { FileUploader } from "./components/FileUploader.tsx";
import { DataProvider } from "./contexts/DataContext.tsx";
import { Instructions } from "./components/Instructions.tsx";

function App() {
  return (
    <DataProvider>
      <div className="app">
        <FileUploader />
        <Tools />
        <Preview />
        <Instructions />
      </div>
    </DataProvider>
  );
}

export default App;
