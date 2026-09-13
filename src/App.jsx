import "./App.css";
import AppRouter from "./Router/AppRouter";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#181818",
            color: "#ffffff",
            border: "1px, solid, 333333",
          },
        }}
      />
      <AppRouter />
    </>
  );
}

export default App;
