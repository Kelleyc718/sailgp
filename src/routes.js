import Dashboard from "./views/Dashboard";
import Sydney from "./views/Sydney.jsx";
import SF from "./views/SF.jsx";

var routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "tim-icons icon-chart-pie-36",
        component: Dashboard,
        layout: "/races"
    },
    {
        path: "/newyork",
        name: "New York",
        icon: "tim-icons icon-atom",
        component: SF,
        layout: "/races"
    },
    {
        path: "/sanfrancisco",
        name: "San Francisco",
        icon: "tim-icons icon-atom",
        component: SF,
        layout: "/races"
    },
    {
        path: "/sydney",
        name: "Sydney",
        icon: "tim-icons icon-pin",
        component: Sydney,
        layout: "/races"
    }
];
export default routes;
