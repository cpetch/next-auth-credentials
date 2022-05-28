import Link from 'next/link';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/client';

import styles from './main-navigation.module.css';

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
  <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Nav>
      {!session && !loading && (
      <Nav.Link href='/auth'>Login</Nav.Link>
      )}
      {session && (
      <Nav.Link href='/profile'>Profile</Nav.Link>
      )}
      {session && (
      <Button onClick={logoutHandler}>Logout</Button>
      )}
    </Nav>
    </Container>
  </Navbar>
  );
}

export default MainNavigation;
