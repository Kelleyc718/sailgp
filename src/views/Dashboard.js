import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardTitle,
    CardText,
    Container,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Jumbotron,
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
            },
            collapse: false
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

    handleCollapse(teamName) {
        this.state.collapse
            ? this.setState({ collapse: false })
            : this.setState({ collapse: teamName })

    }

    render() {
        const { race, races, raceDetails, teams } = this.state;
        return (
            < >
                <div className="content img-background">
                    {raceDetails
                        ? <Row>
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
                        : <div />}
                    <br />
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
                                    ?
                                    <Card color='primary' style={{ overflow: 'scroll' }}>
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
                                            {
                                                teams.length !== 0
                                                    ? teams.map(team => {
                                                        let teamName = team.name.split(" ")
                                                        return (
                                                            <Card key={team.id} className={`${teamName[0]}-team-img`} style={{ marginBottom: '1rem' }} onClick={() => this.handleCollapse(teamName[0])}>
                                                                <CardBody >
                                                                    <CardTitle>
                                                                        {team.name}
                                                                    </CardTitle>
                                                                    <Collapse isOpen={this.state.collapse === teamName[0]}>

                                                                        {
                                                                            Object.keys(team.stats).map((key, i) => {
                                                                                return (
                                                                                    <Card className='opacity-1'>
                                                                                        <CardBody>
                                                                                            <CardHeader>
                                                                                                {key}
                                                                                            </CardHeader>
                                                                                            {
                                                                                                Object.keys(team.stats[key]).map(el => {
                                                                                                    return (
                                                                                                        <Col xl='4'>
                                                                                                            {el}: {team.stats[key][el]}
                                                                                                        </Col>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </CardBody>
                                                                                    </Card>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Collapse>
                                                                </CardBody>


                                                            </Card>
                                                        )
                                                    })
                                                    : <p>No Teams</p>
                                            }

                                        </CardBody>
                                    </Card>


                                    : <React.Fragment>
                                        <hr />
                                        <Row>
                                            <Col xs="12">
                                                <h1 className="text-center">
                                                    Welcome to Sail GP
                                                </h1>
                                            </Col>
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
