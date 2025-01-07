import Container from "react-bootstrap/Container";
import {
  Navbar,
  Form,
  Row,
  Col,
  Image,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import API_ENDPOINTS from "../../config";

function Header({ searchTerm, setSearchTerm }: any) {
  const [user, _setUser] = useLocalStorage("user", null);
  const imagedroup = (
    <Image
      src={
        user.profileimg
          ? `${API_ENDPOINTS.GET_UPLOADS}/${user.profileimg}`
          : "/Profile.png"
      }
      roundedCircle
      style={{ width: "50px", height: "50px" }}
    />
  );
  return (
    <Navbar
      className="bg-body-tertiary sticky-top"
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
    >
      <Container>
        <Row>
          <Col md="4">
            <Navbar.Brand href="#home">
              <Image
                src="/logo.png"
                roundedCircle
                style={{ width: "50px", height: "50px" }}
              />
              {"  "}
              Alexa Music Player
            </Navbar.Brand>
          </Col>
          <Col md="6">
            <Form style={{ paddingTop: "10px" }}>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchTerm}
                className="mr-sm-2"
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Form.Control>
            </Form>
          </Col>
          <Col md="2" style={{ justifyContent: "flex-end" }}>
            <DropdownButton
              variant="text-dark"
              id="dropdown-basic-button"
              title={imagedroup}
              className="ml-1"
              style={{ marginLeft: "50%" }}
            >
              <Dropdown.Item href="/uploadyourmusic">
                Upload Music
              </Dropdown.Item>
              <Dropdown.Item href="/logout">Sign out</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;
