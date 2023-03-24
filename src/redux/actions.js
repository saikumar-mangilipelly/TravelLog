import axios from "axios"
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const FETCH_DATA = "FETCH_DATA"
export const REVIEW = 'REVIEW'
export const GET_REVIEWS = 'GET_REVIEWS'
export const YOUR_REVIEWS = 'YOUR_REVIEWS'
export const DELETE_REVIEW='DELETE_REVIEW'
export const login = (data) => {
    return async dispatch => {
        await axios.post('http://localhost:5000/user/login', data)
            .then(response => {
                if (response.data.message === "success") {
                    localStorage.setItem('loginDetails', JSON.stringify(data.username));
                    return dispatch({
                        type: LOGIN,
                        payload: data.username
                    })
                }
            })
            .catch(error => console.log(error))
    }
}
export const logout = () => {
    return async dispatch => {
        return dispatch({
            type: LOGOUT
        })
    }
}
export const fetchData = () => {
    return async dispatch => {
        const dat = localStorage.getItem('loginDetails')
        return dispatch({
            type: FETCH_DATA,
            payload: JSON.parse(dat)
        })
    }
}
export const addreview = (reviewdata) => {
    return async dispatch => {
        await axios.post('http://localhost:5000/mappin/mapreview', reviewdata)
            .then(response => {                
                return dispatch({
                    type: REVIEW,
                    payload: response.data
                })
            })
            .catch(err => console.log(err))
    }
}
export const getallreviews = () => {
    return async dispatch => {
        await axios.get('http://localhost:5000/mappin/allpins')
            .then(response => {
                return dispatch({
                    type: GET_REVIEWS,
                    payload: response.data
                })
            })
            .catch(err => console.log(err))
    }
}
export const getyourreviews = (username) => {
        return async dispatch => {                             
            await axios.put('http://localhost:5000/mappin/yourpins', {username:username})
                .then(response => {                    
                    return dispatch({
                        type: YOUR_REVIEWS,
                        payload: response.data
                    })
                })
                .catch(err => console.log(err))
        }    
}
export const deletereview=(id)=>{    
    return async dispatch=>{
        await axios.delete(`http://localhost:5000/mappin/deletereview/${id}`)
        .then(response=>{                    
            return dispatch({
                type:DELETE_REVIEW,
                payload:response.data
            })
        })
    }
}