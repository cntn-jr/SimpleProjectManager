import { memo } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { SideLayout } from "../components/template/SideLayout";
import { MenuList } from "../MenuList";

export const Router = memo(() => {
    return (
        <Switch>
            <Route path="/" exact>
                <SideLayout>
                    <Home />
                </SideLayout>
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            {MenuList.map((menu) => (
                <Route key={menu.menuName} path={`/${menu.menuName}`}>
                    <SideLayout>{menu.children}</SideLayout>
                </Route>
            ))}
        </Switch>
    );
});
