import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
// import baseRoutes from "./base_config"

import Main from "./pages/layout"
import NotFound from "./pages/404"
import Login from "./pages/login"
import { message } from "antd"

const Page = () => {
    const token = localStorage.getItem('token')
    message.config({
        top: 100,
        duration: 2,
        maxCount: 1
    });

    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/main" push />} />
                <Route path="/app" component={Main} />
                <Route path="/404" component={NotFound} />
                <Route path="/login" component={Login} />
                {
                    !token && <Redirect to="/login" />
                }
            </Switch>
        </Router>
    )
}

export default Page