 import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import './styles/App.css'
import './styles/responsive.css'
// COMPONENTS
import ParticlesBg from './components/ParticlesBg'
import Videos from './components/Videos'
import Explanation from './components/Explanation'
import Image from './components/Image'
import Title from './components/Title'
import youtube from './api/youtube';
import Alert from 'react-bootstrap/Alert';


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
      isLoading: 'none',
      vidError:{
        errorMsg:'',
        errorLink:'',
        errorSolve:'',
      }
    } 
  }
  componentDidMount(){
    fetch(`https://api.nasa.gov/planetary/apod?date=${currentYear}-${currentMonth}-${currentDay}&api_key=${NASA_API}`)
    .then(res => res.json())
    .then((result) => {
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
        })
        if(result.media_type === 'video'){
          this.setState({vidError: {
            errorMsg:`The picture in ${formatDate(yesterday)}! 😕 is a Video`,
            errorLink: result.url,
            errorSolve:'Watch Here',
          }})
        }
      }else{
        this.setState({chosenDay: {
          date : result.date,
          url : result.url,
          title : result.title,
          explanation : result.explanation,
        }})
        if(result.media_type === 'video'){
          this.setState({vidError: {
            errorMsg:`The picture in ${formatDate(yesterday)}! 😕 is a Video`,
            errorLink: result.url,
            errorSolve:'Watch Here',
          }})
        }
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
      if(result.media_type === 'video'){
          this.setState({vidError: {
            errorMsg:`The Picture of the Day  in ${formatDate(chosenDate)} 😕 is a Video`,
            errorLink: result.url,
            errorSolve:'Watch Here',
          },
        })}
        else {
          this.setState({vidError: {
            errorMsg:'',
            errorLink: '',
            errorSolve:'',
          },
        })}

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
        <div className='title-container'>
          <Title title = {this.state.chosenDay.title}/> 
            <input  className='input-date bg-dark' value={this.state.chosenDay.date} type="date" max={formatDate(currentDate)} onChange={this.changeDate.bind(this)} />
        </div>
        <Explanation explain = {this.state.chosenDay.explanation}/>  
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Related Videos</Accordion.Header>
              <Accordion.Body>
                <Videos videos={this.state.videoList}/>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>      
      </div>
       <div className='image-container'>
         <div className='img-badge' >
            <Image  img = {this.state.chosenDay.url} alt=''/>
            {/* <Badge className='badge' bg="secondary"><a className='full-screen-link' href={this.state.chosenDay.url} rel="noreferrer" target='_blank'>Full Screen</a></Badge> */}
         </div>
         <p id='errorMsg'>{this.state.vidError.errorMsg}</p><a id='errorLink' href={this.state.vidError.errorLink}>{this.state.vidError.errorSolve}</a>
       </div>
       <div style={{zIndex:'-1', position:'absolute'}}><ParticlesBg/></div>
      </div>
    );
  }
}

export default App;
