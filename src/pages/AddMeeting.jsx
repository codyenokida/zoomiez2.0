import React, {useState} from 'react';
import { CirclePicker } from 'react-color';
import styled from 'styled-components'
import { storage } from '@extend-chrome/storage'

const colors = ['#EB5757', '#FFA352', '#FFDE78', '#219653', '#2F80ED', '#9B51E0'];

const Button = styled.button`
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #2D8CFF;
  width: 100px;
  padding: 10px 10px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`

const InputContainer = styled.div`
    position: relative;
    margin-bottom: 25px;
    text-align: left;

    & > label {
        position: absolute;
        top: 0px;
        left: 0px;
        font-size: 16px;
        color: #989898;	
        transition: all 0.2s ease-in-out;
        pointer-events: none;
    }

    & > input {
        border: 0;
        border-bottom: 1px solid #989898;  
        background: transparent;
        width: 100%;
        padding: 0px 0 5px 0;
        font-size: 16px;
        color: #989898;
        &:focus {
            border: none;
            outline: none;
            border-bottom: 1px solid #2d8cff;
        }
        &:focus ~ label,
        &:valid ~ label {
            top: -12px;
            font-size: 12px;
        }
    }

`

const TimeContainer = styled(InputContainer)`
    & > input { 
        width: 45%;
    }
`

const ColorContainer = styled.div`
    display: flex;
    align-items: center;
    & > p {
        margin-right: 10px;
    }
    & > span {
        margin-right: 10px !important;
    }
    .circle-picker {
        margin-bottom: 0 !important;
    }
    & > div > span > div {
        margin: 0 !important;
    }
`;

const Error = styled.span`
    color: #eb5757;
    font-size: 0.5rem;
    margin: 2px 0 0 2px;
`

const AddMeeting = ({toggle}) => {

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [date, setDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [color, setColor] = useState(colors[0]);
    const [error, setError] = useState({
        title: '',
        link: '',
        date: '',
        fromTime: '',
        toTime: '',
        color: ''
    });

    function formatDate(date) {
        const res = date.split("-")
        return `${res[1]}/${res[2]}/${res[0]}`
    }

    function getDate(date) {
        const res = date.split("-");
        const month = res[1];
        const day = res[2];
        const year = res[0];
        // month is zero indexed
        return new Date(year, month - 1, day);
    }

    function sortByDate(meetings) {
        if (meetings === undefined)
            return 0;
        return meetings.sort(function(a, b) {
            return getDate(a.date, a.fromTime) - getDate(b.date, b.fromTime);
        });
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    // return 1 if toTime > fromTime, -1 if toTime < fromTime, 0 if toTime == fromTime
    function compareTime(fromTime, toTime) {
        const f = fromTime.split(':');
        const t = toTime.split(':');
        if (parseInt(f[0]) < parseInt(t[0])) // if from hours are less, true
            return 1;
        else if (parseInt(f[0]) > parseInt(t[0]))
            return -1;
        else {
            if (parseInt(f[1]) < parseInt(t[1])) // if from hours are less, true
                return 1;
            else if (parseInt(f[1]) > parseInt(t[1]))
                return -1;
            else 
                return 0;
        }
    }

    // TODO: form validation
    function handleValidation() {
        let errors = {
            title: '',
            link: '',
            date: '',
            fromTime: '',
            toTime: '',
            color: ''
        }
        // title verification
        if (title.length === 0) 
            errors.title = 'title length is empty.';
        else if (title.length > 32)
            errors.title = 'title length must be less than 32 characters.';
        else
            errors.title = '';
        // link verification
        if (!validURL(link)) 
            errors.link = 'link is invalid';
        else 
            errors.link = '';
        // date verification
        console.log(date, getDate(date), new Date())
        if (date.length === 0)
            errors.date = 'date is empty';
        else if (getDate(date) < new Date()) // if date is less than today
            errors.date = 'date cannot be before today.';
        else 
            errors.date = '';
        // fromTime verifcation
        if (fromTime.length === 0)
            errors.fromTime = 'start time is empty.';
        else
            errors.fromTime = '';
        // toTime verifcation
        const comparedTime = compareTime(fromTime, toTime)
        if (toTime.length === 0)
            errors.toTime = 'end time is empty.';
        else if (comparedTime == -1) // check if toTime is greater than fromTime
            errors.toTime = 'end time must be after start time.';
        else if (comparedTime == 0)
            errors.toTime = 'end time cannot be the same as start time';
        else
            errors.toTime = '';
        if (errors.title !== '' || errors.date !== '' || errors.link !== '' || errors.fromTime !== '' || errors.toTime !== '') {
            setError(errors);
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const meeting = {
            title: title,
            link: link,
            date: formatDate(date),
            fromTime: fromTime,
            toTime: toTime,
            color: color
        }

        if (handleValidation()) {
            storage.sync.get('meetings')
            .then(res => {
                storage.sync.set({
                    meetings: res.meetings ? sortByDate([...res.meetings, meeting]) : [meeting]
                })
            });
    
            toggle();
        }

        
    }

    return (
        <div>
            <p>add meeting!</p>
            <form onSubmit={e => handleSubmit(e)}>
                <InputContainer>
                    <input name="title" type="text" onChange={e => setTitle(e.target.value)} value={title} required></input>
                    <label>title</label>	
                    <Error>{error["title"]}</Error>	
                </InputContainer>
                <InputContainer>
                    <input name="link" type="text" onChange={e => setLink(e.target.value)} value={link} required></input>
                    <label>meeting link</label>	
                    <Error>{error["link"]}</Error>		
                </InputContainer>
                <InputContainer>
                    <input name="date" type="date" onChange={e => setDate(e.target.value)} value={date} required></input>
                    <Error>{error["date"]}</Error>	
                </InputContainer>
                <TimeContainer>
                    <input name="fromTime" type="time" onChange={e => setFromTime(e.target.value)} value={fromTime} required></input>
                    {"to "}
                    <input name="toTime" type="time" onChange={e => setToTime(e.target.value)} value={toTime} required></input>
                    <Error>{error["fromTime"]}</Error>	
                    <Error>{error["toTime"]}</Error>	
                </TimeContainer>
                <ColorContainer>
                    <p>color</p>
                    <CirclePicker colors={colors} color={color} onChange={e => setColor(e.hex)}/>
                </ColorContainer>
                <ButtonContainer>
                    <Button onSubmit={e => handleSubmit(e)}>add meeting</Button>
                </ButtonContainer>
            </form>
        </div>
    )
}

export default AddMeeting;