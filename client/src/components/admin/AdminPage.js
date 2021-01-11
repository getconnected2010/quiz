import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import{ButtonComponent} from '../FormComponents'
import ScoreTable from '../ScoreTable'
import UnflagUser from './UnflagUser'
import DeleteUser from './DeleteUser'
import UpgradeUser from './UpgradeUser'
import DowngradeUser from './DowngradeUser'
import AdminFetchScores from './AdminFetchScores'
import '../css/adminPage.css'

const AdminPage = () => {
    const [scores, setScores] = useState([])
    const [showFlagged, setShowFlagged] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showUpgrade, setShowUpgrade] = useState(false)
    const [showDowngrade, setShowDowngrade] = useState(false)
    const [showScores, setShowScores] = useState(false)
    
    return (
        <div className='Admin'>
            {
                showFlagged ? <UnflagUser setShowFlagged={setShowFlagged}/>
                :
                <ButtonComponent onClick={()=>setShowFlagged(true)} label={'Unflag a user? '}/>
            }
            {
                showDelete ?  <DeleteUser setShowDelete={setShowDelete}/>
                :
                <ButtonComponent onClick={()=>setShowDelete(true)} label={'Delete a user?'}/>
            }
            {
                showUpgrade ? <UpgradeUser setShowUpgrade={setShowUpgrade}/>
                :
                <ButtonComponent onClick={()=>setShowUpgrade(true)} label={'Up-grade a user?'}/>
            }
            {
                showDowngrade ? <DowngradeUser setShowDowngrade={setShowDowngrade}/>
                :
                <ButtonComponent  onClick={()=>setShowDowngrade(true)} label={'Down-grade a user?'}/>
            }
            {
                scores.length>0 && <ScoreTable array={scores} onClick={()=>setScores([])}/>
            }
            {
                showScores ? <AdminFetchScores setShowScores={setShowScores} setScores={setScores}/>
                :
                <ButtonComponent onClick={()=>setShowScores(true)} label={'Get scores of a user?'}/>
            }
        </div>
    )
}

export default AdminPage
