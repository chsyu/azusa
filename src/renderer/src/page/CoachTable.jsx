import Navbar from '../components/Navbar'
import CoachTableDetail from '../components/CoachTableDetail';

function CoachTable({ classes }) {
    const coachDetail = classes[2].coachDetail
    return (
        <div className="container-fluid">
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <h1 className='title'>教練管理</h1>
                    <CoachTableDetail classes={coachDetail}/>
                    {/* <button onClick={()=> console.log(coachDetail)}>pp</button> */}
                </div>
            </div>
            
        </div>
    </div>
    )
  }
  
  export default CoachTable