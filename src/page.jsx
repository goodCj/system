import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
// import baseRoutes from "./base_config"

import Main from "./pages/layout"
import NotFound from "./pages/404"
import Login from "./pages/login"

const Page = () => {
    return (
        <Router>
            <Switch>
                <Suspense fallback={1111}>
                    <Route exact path="/" render={() => <Redirect to="/app/main" push />} />
                    <Route path="/app" component={Main} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/login" component={Login} />
                    <Route component={NotFound} />
                </Suspense>
            </Switch>
        </Router>
    )
}

export default Page