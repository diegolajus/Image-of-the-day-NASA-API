
import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import './styles/App.css'
import './styles/responsive.css'
// COMPONENTS
import Videos from './components/Videos'
import Explanation from './components/Explanation'
import Image from './components/Image'
import Title from './components/Title'
import youtube from './api/youtube';
// import Spinner from 'react-bootstrap/Spinner';


// VARIABLES
const NASA_API = process.env.REACT_APP_NASA_API
const currentDate = (formatDate(new Date()).split("-"))
let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

var [currentYear, currentMonth, currentDay] = [currentDate[0],currentDate[1],Number(currentDate[2])] 
var [yDay,yMonth, yYear] = [
  yesterday.toLocaleDateString().split("/")[0],
  yesterday.toLocaleDateString().split("/")[1],
  yesterday.toLocaleDateString().split("/")[2]
] 

// FUNCTIONS
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  return [year, month, day].join('-');
}

class App extends Component {
  
  constructor () {
    super();
    this.state = {
      chosenDay: {
      date:'',
      url:'',
      title:''
      },
      videoList:[],
      isLoading: 'none'
    } 
  }
  componentDidMount(){
    fetch(`https://api.nasa.gov/planetary/apod?date=${currentYear}-${currentMonth}-${currentDay}&api_key=${NASA_API}`)
    .then(res => res.json())
    .then((result) => {
      this.setState({ isLoading: true })
      if (result.code === 400 || result.code === 404)  {
        fetch(`https://api.nasa.gov/planetary/apod?date=${yYear}-${yMonth}-${yDay}&api_key=${NASA_API}`)
        .then(res => res.json())
        .then((result) => {
          this.setState({chosenDay: {
            date : formatDate(yesterday),
            url : result.url,
            title : result.title,
            explanation : result.explanation,
          }})
        this.setState({ isLoading: false })
        })
      }else{
        this.setState({chosenDay: {
          date : result.date,
          url : result.url,
          title : result.title,
          explanation : result.explanation,
        }})
      }
      // FETCHING VIDEO ACORDING TO THE TITLE OF THE IMAGE OF THE DAY
      const fetchVideo = async () => {
      const YT_API = process.env.REACT_APP_YOUTUBE_API
        const response =  await youtube.get('search', {
          params : {
            part : 'snippet',
            maxResults : 2,
            key : YT_API,
            q: result.title //USING THE NEW TITLE IMAGE FETHCED AS A TERM FOR VIDEOS LIST
          }
        });
        var joinedVideos = []
        Object.values(response.data.items).forEach(i => {
          joinedVideos.push(i.id.videoId)
        });
        this.setState({ videoList: joinedVideos })
      }
      fetchVideo()
    })
  } //COMPONENTDIDMOUNT

  changeDate(e){
    const chosenDate = e.target.value.split("-")
    const [yyyy, MM, dd] = [chosenDate[0], chosenDate[1], chosenDate[2]]
    fetch(`https://api.nasa.gov/planetary/apod?date=${yyyy}-${MM}-${dd}&api_key=80jKuhLAEEEY9WmHGSIbFBLUYJ1QQenbCXpJOh0A`)
      .then(res => res.json())
      .then((result) => {
        this.setState({chosenDay: {
          date : formatDate(chosenDate),
          url : result.url,
          title : result.title,
          explanation : result.explanation,
      }})
      const fetchNewVideo = async () => {
      const YT_API = process.env.REACT_APP_YOUTUBE_API
        const response =  await youtube.get('search', {
          params : {
            part : 'snippet',
            maxResults : 2,
            key : YT_API,
            q: result.title //USING THE NEW TITLE IMAGE FETHCED AS A TERM FOR VIDEOS LIST
          }
        });
        var joinedVideos = []
        Object.values(response.data.items).forEach(i => {
          joinedVideos.push(i.id.videoId)
        });
        this.setState({ videoList: joinedVideos })
      }
      fetchNewVideo()
    })
  }

  render() {
    return (
      <div className='App'>

      <div className='explain-container'>
        <Title title = {this.state.chosenDay.title}/> 
        <Explanation explain = {this.state.chosenDay.explanation}/>  
        <Accordion style={{border:'1px solid green'}}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Related Videos</Accordion.Header>
              <Accordion.Body>
                <Videos videos={this.state.videoList}/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>      
      </div>

       <div className='image-container'>
        <input  className='input-date bg-dark' value={this.state.chosenDay.date} type="date" max={formatDate(currentDate)} onChange={this.changeDate.bind(this)} />
        
         <div style={{textAlign:'center', position:'relative'}}>
            <Image img = {this.state.chosenDay.url}/>
            {/* <Spinner id="spinner" animation="border" /> */}
            <Badge className='badge' bg="secondary"><a className='full-screen-link' href={this.state.chosenDay.url} rel="noreferrer" target='_blank'>Full Screen</a></Badge>
         </div>
       </div>

      </div>
    );
  }
}

export default App;
