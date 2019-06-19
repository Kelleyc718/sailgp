import Dashboard from "./views/Dashboard";

const routes = async () => {
    var routes = [];
    return await fetch(`https://129.213.95.248:7002/ords/sailgp/series`)
        .then(res => res.json())
        .then(data => {
            data.series[0].season[0].raceSets.map(race => {
                routes.push(
                    {
                        path: `/${race.name}`,
                        name: race.name,
                        icon: "tim-icons icon-atom",
                        component: Dashboard,
                        layout: "/races"
                    }
                )
            })
            console.log(routes)
            return routes
        })
}

export default routes;
