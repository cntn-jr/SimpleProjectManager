import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { MenuList } from "../MenuList";

export const Router = memo(() => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            {MenuList.map((menu) => (
                <Route key={menu.menuName} path={`/${menu.menuName}`}>
                    {menu.children}
                </Route>
            ))}
        </Switch>
    );
});
