import React from 'react';
import styled from 'styled-components';
import NavBar from './Navbar';
import logo from '../images/logo.png'

const Container = styled.div`
  width: 300px;
  padding: 10px 20px;
  text-align: center;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
`

const Layout = (props) => (
    <Container>
        <NavBar onClick={props.toggle} type={props.isDashboard}/>
        <Logo src={logo}/>
        {props.children}
    </Container>
);

export default Layout;