import React from 'react'
import{useSelector} from 'react-redux'

const List=()=>{
    const qa= useSelector(state=>state.qa)
    return(
        <div>
            {qa}
        </div>
    )
}
export default List;