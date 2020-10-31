import React from "react"
import Layout from "../components/layout"
import { Router } from "@reach/router"
import { MainPage } from "../privatePages/main"
import PrivateRoute from "../routing/privateRoute"
import ThreadsPage from "../privatePages/threadsPage"
const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/main" component={MainPage}/>
      <PrivateRoute path="/app/main/:id" component={ThreadsPage}/>
    </Router>
  </Layout>
)
export default App