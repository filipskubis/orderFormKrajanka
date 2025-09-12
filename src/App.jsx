import Alerts from "./components/Alerts";
import Form from "./components/Form";
import AlertProvider from "./contexts/AlertContextProvider";

function App() {
  return (
    <AlertProvider>
      <Alerts />
      <div className="w-screen h-screen flex flex-col bg-[#fbe8a6]">
        <Form />
      </div>
    </AlertProvider>
  );
}

export default App;
