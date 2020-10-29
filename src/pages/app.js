import React from "react"
import Layout from "../components/layout"
import { Router } from "@reach/router"
import { MainPage } from "../privatePages/main"
import PrivateRoute from "../routing/privateRoute"
const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/main" component={MainPage}/>
    </Router>
  </Layout>
)
export default App