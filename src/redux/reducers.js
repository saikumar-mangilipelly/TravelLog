import {FETCH_DATA, GET_REVIEWS,REVIEW, LOGIN,LOGOUT,YOUR_REVIEWS, DELETE_REVIEW} from './actions'    
const initialState = {
    username : "",
    issuccess : false,
    review:[],
    yourreviews:[],
    reviewpresent:false
}
function loginReducer (state=initialState, action) {
    switch(action.type){
        case LOGIN:            
            return {...state, username : action.payload, issuccess:true}
        case FETCH_DATA:            
            if(action.payload!==null)
                return {...state, username : action.payload, issuccess:true}
            else    
                return{...state,username:"",issuccess:false}
        case LOGOUT:
            return{...state,username:"",issuccess:false}
        case REVIEW:
            if (action.payload.message === "Data inserted")
                return { ...state, review: [...state.review,action.payload.payload.newmapobj] }
            else{
                let newmapreview=action.payload.payload.newmapobj.reviews[0]                            
                let temp = state.review.find(e => JSON.stringify(e.pin) === JSON.stringify(action.payload.payload.newmapobj.pin))
                temp.reviews.push(newmapreview)                
                return { ...state, review:[...state.review,temp]}
            }
        case GET_REVIEWS:
            return{...state,review:action.payload}
        case YOUR_REVIEWS:                
            if(action.payload.message==="Data found")
                return{...state,yourreviews:action.payload.payload,reviewpresent:true}            
            else    
                return{...state,yourreviwes:[],reviewpresent:false}
        case DELETE_REVIEW:            
            return state;
        default:
            return state;
    }
}
export default loginReducer