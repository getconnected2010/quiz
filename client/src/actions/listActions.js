import {fetchQuizApi, deleteQaApi} from '../services/api/quizApi'


export const addAction=(data)=>(dispatch)=>{
    try{
        dispatch({type: 'ADD', payload: data})
    }catch(error){
        alert('error with adding this question')
    }
}

export const fetchQuizAction=(data)=>async(dispatch)=>{
    try{
        dispatch({type:'FETCH', payload: data}) 
    } catch(error){
        alert ('error retrieving list of questions')
    }
}

export const deleteAction= (data)=>async(dispatch)=>{
    try{
        dispatch({type: 'DELETE', payload: data})
    } catch(error){
        alert('error deleting this question')
    }
}