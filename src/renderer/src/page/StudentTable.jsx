import Navbar from '../components/Navbar'
import StudentTableDetail from '../components/StudentTableDetail';
import testClasses from '../json/test_class.json'
// import newJason from '../json/new_class.json'

function StudentTable({classes}) {
    const stuDetail = classes[1].stuDetail
    
    return (
        <div className="container-fluid">
        <div className="row form_class row-no-gutters">
            <div className="nav col-2">
                <Navbar /> 
            </div>
            <div className='col-10 container margin-left-right'>  
                <div className='table-container'>
                    <h1 className='title'>學員管理</h1>
                    <StudentTableDetail classes={stuDetail}/>
                     {/* <button onClick={()=> console.log(stuDetail)}>pp</button> */}
                </div>
            </div>
            
        </div>
    </div>
    )
  }
  
  export default StudentTable