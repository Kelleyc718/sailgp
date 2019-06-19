import React from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Row,
    Col
} from "reactstrap";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: null,
            raceSets: [],
            races: [],
            teams: [],
            race: {
                name: "Please Choose A Race"
            }
        };

    }


    componentWillMount() {
        let id = this.props.raceId
        fetch(`https://129.213.95.248:7002/ords/sailgp/series`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    races: data.series[0].season[0].raceSets[id].races
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
            .then(data => { this.setState({ raceDetails: data }) })
    }

    render() {

        return (
            <>
                <div className="content">
                    <Row>
                        <Col xs="4">
                            <Card>
                                <CardBody>
                                    <CardTitle className="text-center">All Time Top Speeds</CardTitle>
                                    <CardText>
                                        Boat:
                                    </CardText>
                                    <CardText>
                                        Speed:
                                    </CardText>
                                    <CardText>
                                        Date:
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="4">
                            <Card>
                                <CardBody>
                                    <CardTitle className="text-center">Event Top Speeds</CardTitle>
                                    <CardText>
                                        Boat:
                                    </CardText>
                                    <CardText>
                                        Speed:
                                    </CardText>
                                    <CardText>
                                        Date:
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="4">
                            <Card>
                                <CardBody>
                                    <CardTitle className="text-center">Daily Top Speeds</CardTitle>
                                    <CardText>
                                        Boat:
                                    </CardText>
                                    <CardText>
                                        Speed:
                                    </CardText>
                                    <CardText>
                                        Date:
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-auto">
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
                        <Col xl="12">
                            {this.state.raceDetails
                                ?
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            {this.state.raceDetails.name}
                                        </CardTitle>
                                        <p>
                                            Start: {this.state.raceDetails.start}
                                        </p>
                                        <p>
                                            Finish: {this.state.raceDetails.end}
                                        </p>
                                        <Col xs="12">
                                            {this.state.raceDetails.competitors.map(team => {
                                                console.log(this.state.raceDetails)

                                                return (

                                                    <Card key={team.id}>
                                                        <CardBody>
                                                            <CardTitle>
                                                                {team.name}
                                                            </CardTitle>
                                                            <CardText>
                                                                {team.raceResult}
                                                            </CardText>
                                                        </CardBody>
                                                    </Card>


                                                )
                                            }
                                            )}
                                        </Col>
                                    </CardBody>
                                </Card>
                                :
                                <React.Fragment>
                                    <hr />
                                    <Row>
                                        <h1 className="text-center">
                                            Welcome to Sail GP
                                        </h1>
                                    </Row>
                                </React.Fragment>
                            }
                        </Col>

                    </Row>

                </div>
            </>
        );
    }
}

export default Dashboard;
