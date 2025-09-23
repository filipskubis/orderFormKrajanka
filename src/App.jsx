import Alerts from "./components/Alerts";
import Form from "./components/Form";
import AlertProvider from "./contexts/AlertContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuccessPage from "./components/SuccessPage.jsx";
import UndefinedPage from "./components/UndefinedPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter([
  { path: "*", element: <UndefinedPage /> },
  { path: "/:id", element: <Form />, errorElement: <ErrorPage /> },
  {
    path: "/sukces/:id",
    element: <SuccessPage />,
  },
]);

function App() {
  return (
    <AlertProvider>
      <Alerts />
      <div className="w-screen h-screen xl:h-fit flex flex-col bg-[#fbe8a6] xl:pl-[15%] xl:pr-[15%] xl:pt-[1%] xl:pb-[1%]">
        <RouterProvider router={router} />
      </div>
    </AlertProvider>
  );
}

export default App;
