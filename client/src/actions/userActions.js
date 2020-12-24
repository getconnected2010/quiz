import axios from 'axios';

export const signupAction=(data)=>{
    axios.post('http://localhost:8000/user/signup', data)
        .then((response)=>{
            alert(response.data.msg)
        })
        .catch((error)=>{
            if(error.response && error.response.status===422){
                alert(error.response.data.msg)
            }else{
                alert('An error occured. Please try again. If error persists, contact admin.')
            } 
        })
}