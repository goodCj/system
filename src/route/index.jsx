import { Switch, Route, Redirect} from "react-router-dom"
import routes from "./config"

const App = () => {
    return(
        <Switch>
            {
                routes.map(item => {
                    return <Route exact key={ String(item.path) } {...item}></Route>
                })
            }
            <Route render={() => <Redirect to="/404" />} />
        </Switch>
    )
}

export default App