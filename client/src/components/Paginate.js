import {Link} from 'react-router-dom';
import './paginate.css'

const Paginate=({list, setStartIndex, startIndex, listPerPage})=>{
    const pages = Math.ceil(list.length / listPerPage) 
    const pageArray=[]
    for (let i = 1; i <= pages; i++) {
        pageArray.push(i)   
    }
    return(
        <div className='Paginate'>
            { 
                pageArray.map(page=>(
                    <a key={page} href='#'>
                        <li onClick={(e)=>setStartIndex(e.target.value * listPerPage)} value={page-1}>
                        {page}
                        </li>
                    </a>
                ))
            }
       </div>
    )
}
export default Paginate;
