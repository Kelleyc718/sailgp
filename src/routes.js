import Dashboard from "views/Dashboard.jsx";
import Sydney from "views/Sydney.jsx";
import SF from "views/SF.jsx";

var routes = [
    {
        path: "/newyork",
        name: "New York",
        icon: "tim-icons icon-chart-pie-36",
        component: Dashboard,
        layout: "/admin"
    },
    {
        path: "/sanfrancisco",
        name: "San Francisco",
        icon: "tim-icons icon-atom",
        component: SF,
        layout: "/admin"
    },
    {
        path: "/sydney",
        name: "Sydney",
        icon: "tim-icons icon-pin",
        component: Sydney,
        layout: "/admin"
    }
];
export default routes;
