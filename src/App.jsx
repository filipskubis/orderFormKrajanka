import Alerts from "./components/Alerts";
import Form from "./components/Form";
import AlertProvider from "./contexts/AlertContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuccessPage from "./components/SuccessPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Form /> },
  {
    path: "/sukces",
    element: <SuccessPage />,
  },
]);

function App() {
  return (
    <AlertProvider>
      <Alerts />
      <div className="w-screen h-screen flex flex-col bg-[#fbe8a6]">
        <RouterProvider router={router} />
      </div>
    </AlertProvider>
  );
}

export default App;
