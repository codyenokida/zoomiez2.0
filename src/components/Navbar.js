import React from 'react';
import styled from 'styled-components';

const Container = styled.nav`
    display: flex;
    justify-content: space-between;
`;

const Header = styled.h1`
    font-size: 1rem;
    color: #2D8CFF;
    margin: 0;
`;

const AddButton = styled.button`
    border-radius: 15px;
    width: 20px;
    height: 20px;
    border: none;
    color: white;
    background-color: #2d8cff;
    padding: 3px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    &:focus {
        outline: 0;
    }
`

const CloseButton = styled.button`
    border-radius: 15px;
    width: 20px;
    height: 20px;
    border: none;
    color: white;
    background-color: #eb5757;
    padding: 0 3px 3px 3px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    &:focus {
        outline: 0;
    }
`

const NavBar = (props) => {

    return(
        <Container>
            <Header>zoomiez</Header>
            {props.type ? 
            <AddButton onClick={props.onClick}>+</AddButton>
            :
            <CloseButton onClick={props.onClick}>-</CloseButton>
            }
        </Container>
    );
}

export default NavBar;
