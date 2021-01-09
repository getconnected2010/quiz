import './css/paginate.css'

const Paginate=({list, setStartIndex, startIndex, listPerPage})=>{
    const pages = Math.ceil(list.length / listPerPage) 
    const pageArray=[]
    for (let i = 0; i < pages; i++) {
        pageArray.push(i)   
    }
    return(
        <div className='Paginate'>
            { 
                pageArray.map(page=>(
                    <a key={page} href='#' >
                        <li onClick={(e)=>setStartIndex(e.target.value * listPerPage)} 
                            value={page} 
                            style={listPerPage*page===startIndex? {background:'white', color:'black'}:{textDecoration:'underline'}}
                            >
                        {page+1}
                        </li>
                    </a>
                ))
            }
       </div>
    )
}
export default Paginate;
