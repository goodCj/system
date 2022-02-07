import { Suspense } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
// import baseRoutes from "./base_config"

import Main from "./pages/layout"
import NotFound from "./pages/404"
import Login from "./pages/login"
import { Spin } from "antd"

const Page = () => {
    const token = localStorage.getItem('token')

    return (
        <Router>
            <Switch>
                <Suspense fallback={<Spin style={{ width: '100%', textAlign: 'center', marginTop: 250 }} />}>
                    <Route exact path="/" render={() => <Redirect to="/app/main" push />} />
                    <Route path="/app" component={Main} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/login" component={Login} />
                    {
                        !token && <Redirect to="/login" />
                    }
                </Suspense>
            </Switch>
        </Router>
    )
}

export default Page