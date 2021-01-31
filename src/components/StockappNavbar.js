import {  Nav, Navbar } from "react-bootstrap";
import './StockappNavbar.css'

// will show login/signup for unregistered users & logout to registered users
// Props:
//  activeUser - an object describing the user
const StockappNavbar = function(props) {
    const {activeUser, handleLogout} = props;

    const loginEl = ( ! activeUser)  ?  <Nav.Link href="/#/login">Login</Nav.Link>  : null;
    const signupEl = ( ! activeUser) ?  <Nav.Link href="/#/signup">Signup</Nav.Link>  : null;
    const logoutEl = (activeUser) ?  <Nav.Link onClick={handleLogout}>Logout</Nav.Link> : null;
    return (
        <Navbar className="navBgColor" expand="lg"  variant="dark">
          <Navbar.Brand href="/">StockApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/#/market">Market</Nav.Link>
              <Nav.Link href="/#/watchlist">Watchlist</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            <Nav className="ml-auto">
                  {loginEl}
                  {signupEl}
                  {logoutEl}
            </Nav>
            <Nav> {activeUser ? 'Hello ' + activeUser.fname : ''}</Nav>
        </Navbar>
    )
}
export default StockappNavbar;