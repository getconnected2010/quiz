import {addToListApi, fetchQuizApi, deleteQaApi} from '../services/api'

export const addAction=(data)=>async (dispatch)=>{
   try{
       const result = await addToListApi(data)
       data.id = await result.data.insertId
       dispatch({type: 'ADD', payload: data})
       alert('question successfully added')
   }catch(error){
       alert('error adding to list')
   }
}

export const fetchQuizAction=(subject)=>async(dispatch)=>{
    try{
        const result = await fetchQuizApi(subject)
        dispatch({type:'FETCH', payload: result.data}) 
    } catch(error){
        alert ('error retrieving list of questions')
    }
}

export const deleteAction= (data)=>async(dispatch)=>{
    try{
        const result= await deleteQaApi(data)
        if(result.status===200) return dispatch({type: 'DELETE', payload: data})
    } catch(error){
        alert('error deleting this question')
    }
}