import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import StudentsDetailTable from './StudentsDetailTable'
import DoneClasses from './DoneClasses'
function StudentDetailPage({ stuData }) {

  let courseLeftSum = 0

  for (let i = 0; i < stuData.buyDetail.length; i++) {
    if (i == 0) {
        courseLeftSum = stuData.buyDetail[i].courseLeft *1
    }
    else {
        courseLeftSum += stuData.buyDetail[i].courseLeft *1
    }
  }

  const stuBuyDetailData = stuData.buyDetail

  return (

      <div className="row form_class row-no-gutters">
        <div >
          <h1 className="title">學員</h1>
          <div className="classCoachBox">
            <p className="classCoachBox-item">姓名：{stuData.stuName}</p>
            <p className="classCoachBox-item">性別：{stuData.stuGender}</p>
            <p className="classCoachBox-item">剩餘堂數：{courseLeftSum}</p>
          </div>
          <div>
            {/* <button onClick={()=> console.log(stuData)}>pp</button> */}
            <DoneClasses />
          </div>
          <StudentsDetailTable stuBuyDetailData={stuBuyDetailData} />
        </div>
      </div>

  )
}

export default StudentDetailPage