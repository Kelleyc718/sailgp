import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavLink,
    Nav,
    Container
} from "reactstrap";

class AdminNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            modalSearch: false,
            color: "navbar-transparent"
        };
    }

    // this function opens and closes the collapse on small devices
    toggleCollapse = () => {
        if (this.state.collapseOpen) {
            this.setState({
                color: "navbar-transparent"
            });
        } else {
            this.setState({
                color: "bg-white"
            });
        }
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    render() {
        return (
            <>
                <Navbar
                    className={classNames("navbar-absolute", this.state.color)}
                    expand="lg"
                >
                    <Container fluid>
                        <div className="navbar-wrapper">
                            <div
                                className={classNames("navbar-toggle d-inline", {
                                    toggled: this.props.sidebarOpened
                                })}
                            >
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={this.props.toggleSidebar}
                                >
                                    <span className="navbar-toggler-bar bar1" />
                                    <span className="navbar-toggler-bar bar2" />
                                    <span className="navbar-toggler-bar bar3" />
                                </button>
                            </div>
                            <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                                {this.props.brandText}
                            </NavbarBrand>
                        </div>
                        <button
                            aria-expanded={false}
                            aria-label="Toggle navigation"
                            className="navbar-toggler"
                            data-target="#navigation"
                            data-toggle="collapse"
                            id="navigation"
                            type="button"
                            onClick={this.toggleCollapse}
                        >
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                            <span className="navbar-toggler-bar navbar-kebab" />
                        </button>
                        <Collapse navbar isOpen={this.state.collapseOpen}>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        data-toggle="dropdown"
                                        nav
                                    >
                                        <div className="notification d-none d-lg-block d-xl-block" />
                                        <i className="tim-icons icon-sound-wave" />
                                        <p className="d-lg-none">Alerts</p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Mike John responded to your email
                      </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                You have 5 more tasks
                      </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Your friend Michael is in town
                      </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Another notification
                      </DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">
                                                Another one
                      </DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle
                                        caret
                                        color="default"
                                        data-toggle="dropdown"
                                        nav
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i className="icon-components" />
                                        <b className="caret d-none d-lg-block d-xl-block" />
                                        <p className="d-lg-none">Log out</p>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Profile</DropdownItem>
                                        </NavLink>
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Settings</DropdownItem>
                                        </NavLink>
                                        <DropdownItem divider tag="li" />
                                        <NavLink tag="li">
                                            <DropdownItem className="nav-item">Log out</DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <li className="separator d-lg-none" />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default AdminNavbar;
