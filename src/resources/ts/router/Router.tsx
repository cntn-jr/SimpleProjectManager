import { Center, Spinner } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { Signup } from "../components/pages/Signup";
import { SideLayout } from "../components/template/SideLayout";
import { useAuthentication } from "../hooks/useAuthentication";
import { MenuList } from "../MenuList";

export const Router = memo(() => {
    const [loading, setLoading] = useState<boolean>(false);
    const { getIsAuth } = useAuthentication();
    const [isHome, setIsHome] = useState(false);
    const history = useHistory();

    async function guardRoute() {
        setLoading(true);
        getIsAuth()
            .then((isAuth) => {
                if (isAuth) {
                    if (
                        history.location.pathname === "/login" ||
                        history.location.pathname === "/signup"
                    ) {
                        history.replace("/home");
                    }
                } else {
                    if (
                        history.location.pathname === "/home" ||
                        history.location.pathname === "/task" ||
                        history.location.pathname === "/gantt" ||
                        history.location.pathname === "/chat"
                    ) {
                        history.replace("/login");
                    }
                }
                setIsHome(isAuth);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        guardRoute();
    }, []);
    return (
        <>
            {loading ? (
                <Center mt="200px">
                    <Spinner />
                </Center>
            ) : (
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    {MenuList.map((menu) => (
                        <Route key={menu.menuName} path={`/${menu.menuName}`}>
                            <SideLayout>{menu.children}</SideLayout>
                        </Route>
                    ))}
                    <Route>
                        <Page404 isToHome={isHome} />
                    </Route>
                </Switch>
            )}
        </>
    );
});
