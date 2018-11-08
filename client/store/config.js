import axios from 'axios'

//actions
const SET_CONFIG = "SET_CONFIG";

//action creators
const setConfig = (configData, baseUrl) => {
  return ({
    type: SET_CONFIG,
    configData,
    baseUrl
  })
}

//thunks
//grab configuration data
export const fetchConfigData = () => async (dispatch) => {
    try {
        const {data} = await axios.get('https://api.themoviedb.org/3/configuration?api_key=09c9f42cffc2ed60c067c488dd5ed974')
        const configData = data.images;
        const baseUrl = data.images.secure_base_url;
        console.log("config data fetched", data)
        dispatch(setConfig(configData, baseUrl));
    } catch (err) {
      console.error(err);
    }
}

const initialState = {
                      key: "09c9f42cffc2ed60c067c488dd5ed974",
                      configData: "",
                      baseUrl: ""
                      }

//reducer
export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CONFIG:
        return {...state, configData: action.configData, baseUrl: action.baseUrl}
      default:
        return state
    }
}
