import React, {useState} from 'react'
import {ButtonComponent} from '../FormComponents'
import '../../css/profile.css'
import ScoreTable from '../ScoreTable'
import MyScores from './MyScores'
import ChangeMyUsrName from './ChangeMyUsrName'
import ChangeMyPswrd from './ChangeMyPswrd'


const ProfilePage = () => {
    const [scores, setScores] = useState([])
    const [hideUsernameForm, setHideUsernameForm] = useState(true)
    const [hidePasswordForm, setHidePasswordForm] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    return (
        <div className='Profile'>
            {
                scores.length>0?
                    <ScoreTable onClick={()=>setScores([])} array={scores} />
                :
                    <MyScores submitting={submitting} setSubmitting={setSubmitting} setScores={setScores}/>
            }
            
            {
                hideUsernameForm?
                    <ButtonComponent onClick={()=>setHideUsernameForm(false)} label={submitting?'please wait...':"Change my username"} disabled={submitting}/> 
                :
                    <ChangeMyUsrName submitting={submitting} setSubmitting={setSubmitting} setHideUsernameForm={setHideUsernameForm} />
            }
              
            {
                hidePasswordForm? 
                    <ButtonComponent onClick={()=>setHidePasswordForm(false)} label={submitting?'please wait...':'Change my password'} disabled={submitting}/>
                :
                    <ChangeMyPswrd submitting={submitting} setSubmitting={setSubmitting} setHidePasswordForm={setHidePasswordForm}/>
            }
        </div>
    )
}

export default ProfilePage

