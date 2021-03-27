import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  -webkit-box-shadow: 0px 2px 6px 3px rgba(130,130,130,0.33); 
  box-shadow: 0px 2px 6px 3px rgba(130,130,130,0.33);
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 5px;
  display: flex;
  flex-direction: column;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const ColorBox = styled.div`
  background-color: ${props => props.color};
  width: 30px;
  height: 10px;
  border-radius: 20px;
  margin: 0 10px 0 0;
`
const Button = styled.button`
  border-radius: 15px;
  border: none;
  color: white;
  background-color: #2D8CFF;
  width: 70px;
  padding: 3px 10px;
  cursor: pointer;
  font-size: 0.75rem;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: 0;
  }
  float: right;
`;

const Title = styled.p`
  padding: 0;
  margin: 0;
`

const Time = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.75rem;
  color: #4F4F4F;
`

const Link = styled.a`
  color: white;
  text-decoration: none;
`

const ButtonContainer = styled.div``;

const Meeting = ({id, title, link, date, fromTime, toTime, color, removeMeeting}) => {

  function formatTime(time) {
    const x = time.split(":");
    if (x[0] < 12)
      return `${time}am`;
    return `${x[0] - 12}:${x[1]}pm`
  }

  return(
    <Box>
      <TitleContainer>
        <ColorBox color={color}/>
        <Title>{title}</Title>
      </TitleContainer>
      <TitleContainer>
        <ColorBox color="transparent"/>
        <Time>{formatTime(fromTime)} - {formatTime(toTime)}</Time>
      </TitleContainer>
      <ButtonContainer>
        <Button><Link href={link} target="_blank">join now</Link></Button>
      </ButtonContainer>
      <a onClick={() => removeMeeting(JSON.parse(id))}>remove</a>
    </Box>
  );

}

export default Meeting;