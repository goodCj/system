import React, { Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import routes from "./config"

const createRoute = (routes) => {
    let arr = []
    function rr(routes) {
        routes.map(item => {
            if (item.children?.length > 0) {
                rr(item.children)
            } else {
                arr.push(<Route exact key={String(item.path)} path={item.path} component={item.component}></Route>)
            }
            return false
        })
    }
    rr(routes)
    return arr
}

const changeRoute = (userInfo, routes) => {
    return routes.map(item => {
        if (userInfo?.role === 0 && item.title === '公司管理') {
            console.log(item)
            item.show = true
        } else if (userInfo?.role !== 0 && item.title === '公司管理') {
            item.show = false
        }
        if (userInfo?.role > 1 && item.title === '标签管理') {
            item.show = false
        } else if (userInfo?.role <= 1 && item.title === '标签管理') {
            item.show = true
        }
        return item
    })
}

const App = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let newRoute = changeRoute(userInfo, routes)
    console.log(newRoute)
    return (
        <Switch>
            <Suspense fallback={''}>
                {
                    createRoute(newRoute).map((item) => {
                        return item
                    })
                }
                <Route exact path='/app' render={() => <Redirect to="/app/main" />} />
            </Suspense>
        </Switch>
    )
}

export default React.memo(App)