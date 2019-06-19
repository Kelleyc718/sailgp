import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
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
            raceDetails: null,
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

    fetchRace = (id) => {
        fetch(`https://129.213.95.248:7002/ords/sailgp/raceinfo/stats/raceid/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ raceDetails: data, teams: data.competitors })
            })
    }

    render() {
        const { race, races, raceDetails, teams } = this.state;
        console.log(this.state)
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
                                    {race.name}
                                </DropdownToggle>
                                <DropdownMenu className="dropdown">
                                    {races.map(race => {
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
                            {
                                raceDetails
                                    ? <Card color="primary">
                                        <CardBody>
                                            <CardTitle>
                                                {raceDetails.name}
                                            </CardTitle>
                                            <CardSubtitle>
                                                {raceDetails.type}
                                                <p>Start: {raceDetails.start}</p>
                                                <p>Finish: {raceDetails.end}</p>
                                                <p>Legs: {raceDetails.numberOfLegs}</p>
                                            </CardSubtitle>
                                            <Col xs="12">
                                                {
                                                    teams.length !== 0
                                                        ? teams.map(team => {
                                                            return (
                                                                <Card key={team.id}>
                                                                    <CardBody>
                                                                        <CardTitle>
                                                                            {team.name}
                                                                        </CardTitle>
                                                                        {
                                                                            Object.keys(team.stats).map((key, i) => {
                                                                                return (
                                                                                    <Card>
                                                                                        <CardBody>
                                                                                            <CardHeader>
                                                                                                {key}
                                                                                            </CardHeader>
                                                                                            {Object.keys(team.stats[key]).map(el => {
                                                                                                return (
                                                                                                    <CardText>
                                                                                                        {el}: {team.stats[key][el]}
                                                                                                    </CardText>
                                                                                                )
                                                                                            })}
                                                                                        </CardBody>
                                                                                    </Card>
                                                                                )
                                                                            })
                                                                        }
                                                                    </CardBody>
                                                                </Card>
                                                            )
                                                        })
                                                        : <p>No Teams</p>
                                                }
                                            </Col>
                                        </CardBody>
                                    </Card>
                                    : <React.Fragment>
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
