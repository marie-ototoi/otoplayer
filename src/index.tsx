import React from 'react'
import ReactDOM from 'react-dom'
import Player from './components/Player'
import reportWebVitals from './reportWebVitals'
const tracks = [
  {
    duration: 326,
    url: '/a_71/disque_1/tracks/01_Izdiucz.mp3',
    title: 'Izdiucz',
  },
  {
    duration: 298,
    url: '/a_71/disque_1/tracks/02_Hig.mp3',
    title: 'Hig',
  },
  {
    duration: 244,
    url: '/a_71/disque_1/tracks/03_MehrabanBash.mp3',
    title: 'Mehraban Bash',
  },
  {
    duration: 386,
    url: '/a_71/disque_1/tracks/04_Nebah.mp3',
    title: 'Nebah',
  },
  {
    duration: 295,
    url: '/a_71/disque_1/tracks/05_Oudische.mp3',
    title: 'Oudische',
  },
  {
    duration: 250,
    url: '/a_71/disque_1/tracks/06_IzdiuczRadioEdit.mp3',
    title: 'IzdiuczRadioEdit',
  },
  {
    duration: 205,
    url: '/a_71/disque_1/tracks/07_Ayn.mp3',
    title: 'Ayn',
  },
  {
    duration: 288,
    url: '/a_71/disque_1/tracks/08_Volkische.mp3',
    title: 'Izdiucz',
  },
  {
    duration: 305,
    url: '/a_71/disque_1/tracks/09_HijazOnD.mp3',
    title: 'HijazOnD',
  },
]

ReactDOM.render(
  <React.StrictMode>
    <Player tracks={tracks} cover="/a_71/cover/cover_71.jpg" side={400} />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
