import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavLink,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";



// #########################################
// // // used inside src/views/Dashboard.jsx
// #########################################
const chartOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
    },
    responsive: true,
    scales: {
        yAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent"
                },
                ticks: {
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9a9a9a"
                }
            }
        ],
        xAxes: [
            {
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.1)",
                    zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9a9a9a"
                }
            }
        ]
    }
};

function raceData(id) {
    console.log(id)
    return
}


const chart = {
    data1: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
            labels: [
                "JAN",
                "FEB",
                "MAR",
                "APR",
                "MAY",
                "JUN",
                "JUL",
                "AUG",
                "SEP",
                "OCT",
                "NOV",
                "DEC"
            ],
            datasets: [
                {
                    label: "None",
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor: "#1f8ef1",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#1f8ef1",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#1f8ef1",
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100]
                }
            ]
        }
    },
    options: chartOptions
}


class Dashboard extends React.Component {
    state = {
        bigChartData: "",
        races: [],
        teams: [],
        race: {
            name: "Please Choose A Race"
        }
    };

    componentWillMount() {
        fetch(`https://129.213.95.248:7002/ords/sailgp/series`)
            .then(res => res.json())
            .then(data => {
                console.log(data.series[0].season[0].raceSets[1].races)
                this.setState({
                    races: data.series[0].season[0].raceSets[1].races
                })
            })
    }


    setBgChartData = name => {
        this.setState({
            bigChartData: name
        });
    };

    fetchRace = (id) => {
        fetch(`https://129.213.95.248:7002/ords/sailgp/raceinfo/stats/raceid/${id}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col xs="12">
                            <UncontrolledDropdown>
                                <DropdownToggle
                                    caret
                                    color="primary"
                                    data-toggle="dropdown"
                                    onClick={e => e.preventDefault()}
                                >
                                    {this.state.race.name}
                                </DropdownToggle>
                                <DropdownMenu className="dropdown">
                                    {this.state.races.map(race => {
                                        return (
                                            <DropdownItem key={race.id} value={race.id} onClick={
                                                () => this.setState(
                                                    {
                                                        race: {
                                                            name: race.name,
                                                            id: race.id
                                                        }
                                                    }, this.fetchRace(race.id))} >
                                                {race.name}
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Card className="card-chart">
                                <CardHeader>
                                    <Row>
                                        <Col className="text-left" sm="6">
                                            <CardTitle tag="h2"></CardTitle>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={raceData[this.state.bigChartData]}
                                            options={raceData.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Dashboard;
