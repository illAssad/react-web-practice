import DashboardLayout from './layouts/DashboardLayout.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clients from "./pages/Clients.tsx";
import ClientDetails from "./pages/ClientDetails.tsx";
import BasePage from "./pages/BasePage.tsx";
import ClientForm from "./pages/ClientEditPage.tsx";
import Login from "./pages/Login.tsx";

function App() {

  return (
      <BrowserRouter>

          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path = "/" element={<DashboardLayout/>}>
                  <Route index element={<Clients />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/clients/:id" element={<ClientDetails />} />
                  <Route path="/clients/new" element={<ClientForm />} />
                  <Route path="/clients/edit/:id" element={<ClientForm />} />

                  <Route path = "/settings" element={<BasePage title={"Settings................................................." +
                      "."} children={null}/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
