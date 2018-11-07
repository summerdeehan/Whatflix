import axios from 'axios'
import history from '../history'


const apiKey = "09c9f42cffc2ed60c067c488dd5ed974"
const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWM5ZjQyY2ZmYzJlZDYwYzA2N2M0ODhkZDVlZDk3NCIsInN1YiI6IjViZTEyN2YwYzNhMzY4MDlmMDAwNTZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e5KD-0NFUW4lrpnnd80bn-YaYOarixmzVodKE9hW0v4" //v4

const GOT_TOKEN = "GOT_TOKEN"
const GOT_SESSION = "GOT_SESSION"

const gotToken = token => ({type: GOT_TOKEN, token});
const gotSession = token => ({type: GOT_SESSION, token});


export const fetchToken = () => {
  return async (dispatch) => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`)
    dispatch(gotToken(data.request_token));
  }
}
export const fetchSessionToken = (token) => {
  console.log("token", token)
  return async (dispatch) => {
    const {data} = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, token)
    console.log("data", data)
    dispatch(gotSession(data));
  }
}


const initialState = {accessToken: "", sessionToken: ""}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_TOKEN:
      return {...state, accessToken: action.token}
    case GOT_SESSION:
      return {...state, sessionToken: action.token}
    default:
      return state
  }
}
