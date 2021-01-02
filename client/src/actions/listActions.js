import {addToListApi, fetchAllListApi, deleteQaApi} from '../services/api'

export const addAction=(data)=>async (dispatch)=>{
   try{
       const result = await addToListApi(data)
       data.id = await result.data.insertId
       dispatch({type: 'ADD', payload: data})
       alert('question successfully added')
   }catch(error){
       console.log(error)
       alert('error adding to list')
   }
}

export const fetchAll=()=>async(dispatch)=>{
    try{
        const result = await fetchAllListApi()
        dispatch({type:'FETCH', payload: result.data}) 
    } catch(error){
        console.log(error)
        alert ('error retrieving list of questions')
    }
}

export const deleteQA= (data)=>async(dispatch)=>{
    try{
        const result= await deleteQaApi(data)
        dispatch({type: 'DELETE', payload: data})
    } catch(error){
        console.log(error)
        alert('error deleting this question')
    }
}