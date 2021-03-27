import React, {useEffect, useState} from 'react';
import Meeting from '../components/Meeting';
import styled from 'styled-components';

const Indicator = styled.span`
    text-decoration: underline;
    text-decoration-color: #2d8cff;
`

const DateIndicator = styled.span`
    font-size: 0.75rem;
    color: #989898;
`

const Container = styled.div`
    overflow: scroll;
`

const Introduction = styled.p`
    margin: 10px 25px;
`

const IndicatorContainer = styled.div`
    text-align: left;
`

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const Home = ({allMeetings, removeMeeting}) => {

    const todayMeetings = allMeetings["todayMeetings"];
    const tomorrowMeetings = allMeetings["tomorrowMeetings"];
    const otherMeetings = allMeetings["otherMeetings"];

    return (
        <Container>
            <Introduction>don&apos;t forget you have meetings coming up!</Introduction>
            {
                allMeetings["todayMeetings"].length !== 0 ? 
                <>
                    <IndicatorContainer><b><Indicator>today</Indicator></b>  <DateIndicator>{new Date().getWeekDay()}</DateIndicator></IndicatorContainer>
                    {todayMeetings.map(meeting => {
                        return <Meeting key={JSON.stringify(meeting)} id={JSON.stringify(meeting)} title={meeting.title} link={meeting.link} date={meeting.date} fromTime={meeting.fromTime} toTime={meeting.toTime} color={meeting.color} removeMeeting={removeMeeting}/>
                    })}
                </>
                : null
            }
            {
                allMeetings["tomorrowMeetings"].length !== 0 ? 
                <>
                    <IndicatorContainer><b><Indicator>tomorrow</Indicator></b>  <DateIndicator>{tomorrow.getWeekDay()}</DateIndicator></IndicatorContainer>
                    {tomorrowMeetings.map(meeting => {
                        return <Meeting key={JSON.stringify(meeting)} id={JSON.stringify(meeting)} title={meeting.title} link={meeting.link} date={meeting.date} fromTime={meeting.fromTime} toTime={meeting.toTime} color={meeting.color} removeMeeting={removeMeeting}/>
                    })}
                </>
                : null
            }
            {
                allMeetings["otherMeetings"].length !== 0 ? 
                <>
                    <IndicatorContainer><b><Indicator>upcoming meetings</Indicator></b> </IndicatorContainer>
                    {otherMeetings.map(meeting => {
                        return <Meeting key={JSON.stringify(meeting)} id={JSON.stringify(meeting)} title={meeting.title} link={meeting.link} date={meeting.date} fromTime={meeting.fromTime} toTime={meeting.toTime} color={meeting.color} removeMeeting={removeMeeting}/>
                    })}
                </>
                : null
            }
        </Container>
    )
}

export default Home;