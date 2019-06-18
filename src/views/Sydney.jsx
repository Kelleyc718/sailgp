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

// core components
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "variables/charts.js";

let chart1_2_options = {
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

// #########################################
// // // used inside src/views/Dashboard.jsx
// #########################################


const raceData = {
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
    data2: canvas => {
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
                    label: "My First dataset",
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
                    data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120]
                }
            ]
        };
    },
    data3: canvas => {
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
                    label: "My First dataset",
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
                    data: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
                }
            ]
        };

    },
    options: chart1_2_options
}

class Sydney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "",
            raceSet: [],
            teams: []
        };
    }

    componentWillMount() {
        fetch(`https://129.213.95.248:7002/ords/sailgp/series`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    raceSet: data.series[0].season[0].raceSets
                })
            })
    }


    setBgChartData = name => {
        this.setState({
            bigChartData: name
        });
    };

    handleRaceClick = e => {
        this.setState({
            race: e.target.value
        })
        console.log(this.state.race)
    }



    render() {
        console.log(this.state.raceSet)



        // const { teams } = this.state

        return (
            <>
                <div className="content">
                    <Row>
                        <Col xs="12">
                            <UncontrolledDropdown>
                                <span>
                                    Choose A Race <DropdownToggle
                                        caret
                                        color="primary"
                                        data-toggle="dropdown"
                                        onClick={e => e.preventDefault()}
                                    >
                                    </DropdownToggle>
                                </span>
                                <DropdownMenu className="dropdown-navbar" left tag="ul">
                                    {this.state.raceSet.map(race => {
                                        return (
                                            <NavLink tag="li" key={race.id} onClick={(e) => this.handleRaceClick(e.target.value)}>
                                                <DropdownItem className="nav-item">
                                                    {race.name}
                                                </DropdownItem>
                                            </NavLink>

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
                                            <h5 className="card-category"></h5>
                                            <CardTitle tag="h2"></CardTitle>
                                        </Col>
                                        <Col sm="6">
                                            <ButtonGroup
                                                className="btn-group-toggle float-right"
                                                data-toggle="buttons"
                                            >
                                                <Button
                                                    tag="label"
                                                    className={classNames("btn-simple", {
                                                        active: this.state.bigChartData === "data1"
                                                    })}
                                                    color="info"
                                                    id="0"
                                                    size="sm"
                                                    onClick={() => this.setBgChartData(raceData.data1)}
                                                >
                                                    <input
                                                        defaultChecked
                                                        className="d-none"
                                                        name="options"
                                                        type="radio"
                                                    />
                                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                        Accounts
                          </span>
                                                    <span className="d-block d-sm-none">
                                                        <i className="tim-icons icon-single-02" />
                                                    </span>
                                                </Button>
                                                <Button
                                                    color="info"
                                                    id="1"
                                                    size="sm"
                                                    tag="label"
                                                    className={classNames("btn-simple", {
                                                        active: this.state.bigChartData === "data2"
                                                    })}
                                                    onClick={() => this.setBgChartData("data2")}
                                                >
                                                    <input
                                                        className="d-none"
                                                        name="options"
                                                        type="radio"
                                                    />
                                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                        Purchases
                          </span>
                                                    <span className="d-block d-sm-none">
                                                        <i className="tim-icons icon-gift-2" />
                                                    </span>
                                                </Button>
                                                <Button
                                                    color="info"
                                                    id="2"
                                                    size="sm"
                                                    tag="label"
                                                    className={classNames("btn-simple", {
                                                        active: this.state.bigChartData === "data3"
                                                    })}
                                                    onClick={() => this.setBgChartData("data3")}
                                                >
                                                    <input
                                                        className="d-none"
                                                        name="options"
                                                        type="radio"
                                                    />
                                                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                                        Sessions
                          </span>
                                                    <span className="d-block d-sm-none">
                                                        <i className="tim-icons icon-tap-02" />
                                                    </span>
                                                </Button>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={chartExample1[this.state.bigChartData]}
                                            options={chartExample1.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Total Shipments</h5>
                                    <CardTitle tag="h3">
                                        <i className="tim-icons icon-bell-55 text-info" />{" "}
                                        763,215
                  </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={chartExample2.data}
                                            options={chartExample2.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Daily Sales</h5>
                                    <CardTitle tag="h3">
                                        <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                                        3,500€
                  </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Bar
                                            data={chartExample3.data}
                                            options={chartExample3.options}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Completed Tasks</h5>
                                    <CardTitle tag="h3">
                                        <i className="tim-icons icon-send text-success" /> 12,100K
                  </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={chartExample4.data}
                                            options={chartExample4.options}
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

export default Sydney;
