import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import routes from "./config"

const createRoute = (routes) => {
    let arr = []
    function rr(routes) {
        routes.map(item => {
            if (item.show) {
                console.log(item)
                if (item.children?.length > 0) {
                    rr(item.children)
                } else {
                    arr.push(<Route exact key={String(item.path)} path={item.path} component={item.component}></Route>)
                }
            }
        })
    }
    console.log(routes)
    rr(routes)
    return arr
}

const App = () => {
    const token = localStorage.getItem('token')
    console.log('----', token)
    return (
        <Switch>
            {
                createRoute(routes).map((item) => {
                    return item
                })
            }
            <Route exact path='/app' render={() => <Redirect to="/app/main" />} />
        </Switch>
    )
}

export default React.memo(App)