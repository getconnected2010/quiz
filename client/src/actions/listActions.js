import axios from 'axios';

export const addAction=(data)=>async (dispatch)=>{
   try{
       const result = await axios.post('http://localhost:8000/quiz/add', data)
       data.id = result.data.insertId
       dispatch({type: 'ADD', payload: data})
   }catch(error){
       console.log(error)
   }
}

export const fetchAll=()=>async(dispatch)=>{
    try{
        const result = await axios.get('http://localhost:8000/quiz/list')
        dispatch({type:'FETCH', payload: result.data}) 
    } catch(error){
        console.log(error)
    }
}

export const deleteQA= (data)=>async(dispatch)=>{
    try{
        await axios.delete(`http://localhost:8000/quiz/delete/${data}`)
        dispatch({type: 'DELETE', payload: data})
    } catch(error){
        if(error) throw error;
    }
}