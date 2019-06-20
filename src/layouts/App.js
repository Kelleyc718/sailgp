import React from "react"
import { Route, Switch } from "react-router-dom"
import PerfectScrollbar from "perfect-scrollbar"
import AppNavbar from "../components/Navbars/AppNavbar"
import Dashboard from "../views/Dashboard"
import Sidebar from "../components/Sidebar/Sidebar"
import logo from "../assets/img/logo.png"
var ps

var routes = [
    {
        path: "/sydney",
        raceId: 0,
        name: "Sydney",
        icon: "tim-icons icon-atom",
        component: Dashboard,
        layout: "/races"
    },
    {
        path: "/ny",
        raceId: 1,
        name: "New York",
        icon: "tim-icons icon-atom",
        component: Dashboard,
        layout: "/races"
    },
    {
        path: "/sanfrancisco",
        raceId: 2,
        name: "San Francisco",
        icon: "tim-icons icon-atom",
        component: Dashboard,
        layout: "/races"
    },
]

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            backgroundColor: "image",
            sidebarOpened:
                document.documentElement.className.indexOf("nav-open") !== -1
        }
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
            ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
            document.documentElement.className += " perfect-scrollbar-off";
            document.documentElement.classList.remove("perfect-scrollbar-on");
        }
    }

    componentDidUpdate(e) {
        if (e.history.action === "PUSH") {
            if (navigator.platform.indexOf("Win") > -1) {
                let tables = document.querySelectorAll(".table-responsive");
                for (let i = 0; i < tables.length; i++) {
                    ps = new PerfectScrollbar(tables[i]);
                }
            }
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
    }

    toggleSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({ sidebarOpened: !this.state.sidebarOpened });
    }

    getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/races") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={(props) => <Dashboard {...props} raceId={prop.raceId} />}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    }

    getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path
                ) !== -1
            ) {
                return `Sail GP - ${routes[i].name}`;
            }
        }
        return "Sail GP";
    }

    render() {
        return (
            <>
                <div className="wrapper img-background" >
                    <Sidebar
                        {...this.props}
                        routes={routes}
                        bgColor={this.state.backgroundColor}
                        logo={{
                            outterLink: "https://www.sailgp.com/",
                            text: "Sail GP",
                            imgSrc: logo
                        }}
                        toggleSidebar={this.toggleSidebar}
                    />
                    <div
                        className="main-panel"
                        ref="mainPanel"
                        data={this.state.backgroundColor}
                    >
                        <AppNavbar
                            {...this.props}
                            brandText={this.getBrandText(this.props.location.pathname)}
                            toggleSidebar={this.toggleSidebar}
                            sidebarOpened={this.state.sidebarOpened}
                        />
                        <Switch>{this.getRoutes(routes)}</Switch>
                    </div>
                </div>

            </>
        )
    }

}

export default App
