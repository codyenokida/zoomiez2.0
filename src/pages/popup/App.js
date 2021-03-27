import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Home from '../Home.jsx';
import AddMeeting from '../AddMeeting.jsx';
import { storage } from '@extend-chrome/storage';

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear();
}

const isTomorrow = (someDate) => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0,0,0,0)
  return someDate.getFullYear() == tomorrow.getFullYear() && 
      someDate.getMonth() == tomorrow.getMonth() && 
      someDate.getDate() == tomorrow.getDate();
}

function getDate(date, fromTime) {
  const res = date.split("/");
  const time = fromTime.split(":");
  const month = res[0];
  const day = res[1];
  const year = res[2];
  const hour = time[0];
  const min = time[1];
  // month is zero indexed
  return new Date(year, month - 1, day, hour, min);
}

function isMeetingEqual(meeting1, meeting2) {
  return (meeting1.title === meeting2.title && 
    meeting1.link === meeting2.link && 
    meeting1.date === meeting2.date && 
    meeting1.fromTime === meeting2.fromTime &&
    meeting1.toTime === meeting2.toTime &&
    meeting1.color === meeting1.color);
}

// TODO: delete ones that are out of the date range
// add delete functionality to ones that you dont want
// add edit functionality to existing
const App = () => {

  const [isDashboard, setIsDashboard] = useState(true);
  const [allMeetings, setAllMeetings] = useState({todayMeetings: [], tomorrowMeetings: [], otherMeetings: []});

  useEffect(() => {
    storage.sync.get('meetings')
    .then(({meetings}) => {
      if (meetings === undefined || meetings === null) {
        storage.sync.set({
          meetings: []
        });
      }
      else {
        updateMeetings();
      }
    })
  }, [])

  const removeMeeting = (key) => {
    let temp = [];
    console.log(key);
    storage.sync.get('meetings')
    .then(({meetings}) => {
      console.log(meetings);
      if (meetings !== undefined) {
        for (const meeting of meetings) {
          if (!isMeetingEqual(key, meeting)) {
            temp.push(meeting);
          }
        }
        console.log(temp);
        storage.sync.set({
          meetings: temp
      })
      }
    })
    updateMeetings();
  }

  const updateMeetings = () =>{
    storage.sync.get('meetings')
    .then(({meetings}) => {
      let todays = [];
      let tomorrows = [];
      let others = [];
      if (meetings !== undefined) {
        for (const meeting of meetings) {
          if (isToday(getDate(meeting.date, meeting.fromTime))) 
            todays.push(meeting);
          else if (isTomorrow(getDate(meeting.date, meeting.fromTime)))
            tomorrows.push(meeting)
          else
            others.push(meeting);
        }
        setAllMeetings({
          todayMeetings: todays, 
          tomorrowMeetings: tomorrows, 
          otherMeetings: others
        });
      }
    });
  }

  return(
    <Layout toggle={() => setIsDashboard(!isDashboard)} isDashboard={isDashboard}>
      {isDashboard ?
        <>
          {updateMeetings()}
          <Home allMeetings={allMeetings} removeMeeting={removeMeeting}/>
        </>
        :
        <AddMeeting toggle={() => setIsDashboard(!isDashboard)}/>
      }
    </Layout>
  )
}

export default App;