import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"

import MainPage from "./pages/Main"
import AuthPage from "./pages/Auth"

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<MainPage />} />
    <Route path="/auth" element={<AuthPage />} />
  </>
))


const App: React.FC = () => {
  return (

    <RouterProvider router={router}/>
    
  )
}

export default App
