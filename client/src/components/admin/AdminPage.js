import React, {useState} from 'react'
import{ButtonComponent} from '../FormComponents'
import ScoreTable from '../ScoreTable'
import ResetUser from './ResetUser'
import DeleteUser from './DeleteUser'
import UpgradeUser from './UpgradeUser'
import DowngradeUser from './DowngradeUser'
import AdminFetchScores from './AdminFetchScores'
import '../../css/adminPage.css'

const AdminPage = () => {
    const [scores, setScores] = useState([])
    const [showFlagged, setShowFlagged] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showUpgrade, setShowUpgrade] = useState(false)
    const [showDowngrade, setShowDowngrade] = useState(false)
    const [showScores, setShowScores] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    
    return (
        <div className='Admin'>
            {
                showFlagged ? <ResetUser submitting={submitting} setSubmitting={setSubmitting} setShowFlagged={setShowFlagged}/>
                :
                <ButtonComponent disabled={submitting} onClick={()=>setShowFlagged(true)} label={submitting?'please wait...':'Reset a user? '}/>
            }
            {
                showDelete ?  <DeleteUser showDelete={showDelete} submitting={submitting} setSubmitting={setSubmitting} setShowDelete={setShowDelete}/>
                :
                <ButtonComponent disabled={submitting} onClick={()=>setShowDelete(true)} label={submitting?'please wait...':'Delete a user?'}/>
            }
            {
                showUpgrade ? <UpgradeUser submitting={submitting} setSubmitting={setSubmitting} setShowUpgrade={setShowUpgrade}/>
                :
                <ButtonComponent disabled={submitting} onClick={()=>setShowUpgrade(true)} label={submitting?'please wait...':'Upgrade a user?'}/>
            }
            {
                showDowngrade ? <DowngradeUser submitting={submitting} setSubmitting={setSubmitting} setShowDowngrade={setShowDowngrade}/>
                :
                <ButtonComponent disabled={submitting} onClick={()=>setShowDowngrade(true)} label={submitting?'please wait...':'Down-grade a user?'}/>
            }
            {
                scores.length>0 && <ScoreTable array={scores} onClick={()=>setScores([])}/>
            }
            {
                showScores ? <AdminFetchScores submitting={submitting} setSubmitting={setSubmitting} setShowScores={setShowScores} setScores={setScores}/>
                :
                <ButtonComponent disabled={submitting} onClick={()=>setShowScores(true)} label={submitting?'please wait...':'Get scores of a user?'}/>
            }
        </div>
    )
}

export default AdminPage
