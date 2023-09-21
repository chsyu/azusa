import { Link } from 'react-router-dom'
import StudentsList from '../components/StudentsList'
import CoachTopBar from '../components/CoachTopBar'
import CoachDetailTable from '../components/CoachDetailTable'
import Navbar from '../components/Navbar'
//json
//import testClass from '../json/test_class.json'
import { useParams } from 'react-router-dom';

function CoachDetail({ classes }) {
//   const onChange = (date, dateString) => {
//     console.log(date, dateString)
//   }
    const { coachID } = useParams();
    const coachDetail = classes[2].coachDetail
    console.log("aaa:",coachID)

    const coachData = coachDetail.find(
        (x) => x.coachID === coachID
    );
    console.log(coachData)


    return (
        <div className="container-fluid" >
            <div className="row form_class row-no-gutters">
                <div className="nav col-2">
                    <Navbar /> 
                </div>
                <div className='col-10 container margin-left-right'>  
                    <div className='table-container'>
                        <h1 className="title">教練</h1>
                        <div className="classCoachBox">
                            <p className="classCoachBox-item">教練：{coachData.coachName}</p>
                            <p className="classCoachBox-item">性別：{coachData.coachGender}</p>
                            {/* <p className="classCoachBox-item">堂薪：{coachData.salary}</p> */}
                        </div>

                        <div className="classcontainer">
                            {/* <div className='col-3'> */}
                                {/* use map to show students */}
                                {/* <StudentsList coachData={coachData}/> */}
                            {/* </div> */}
                        
                            <div className="coachdetailright">
                                <CoachTopBar coachValue={coachData} />
                                <div className="chooseDateBox">
                                    
                                    <div className="DatePicksTitle">
                                        {/*<DatePicker onChange={onChange} picker="month" />*/}
                                        {/* date picker here */}
                                        <input id="startDate" class="form-control" type="month" />
                                    </div>
                                    {/* <div className="btnbox-item">
                                        <button type="button" className="btn btn-danger">
                                            刪除
                                        </button>
                                    </div> */}
                                </div>

                                <div>
                                <CoachDetailTable classes={coachData} />
                                
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default CoachDetail