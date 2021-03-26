import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { storage } from '@extend-chrome/storage'

Date.prototype.getWeekDay = function() {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return this.toLocaleDateString(undefined, options);
}

const root = document.querySelector('#root')

ReactDOM.render(<App />, root)
