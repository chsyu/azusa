import { useParams } from 'react-router-dom';
import newJson from '../json/new_class.json'

function CoachTopBar({coachValue}) {
    const { id } = useParams();
  //console.log('courseleft:', coachValue[id].student.courseLeft)

    // 獲取教練所教授的課程的 classID
    const courseLefts =[]
    const matchingStudentData = [];
    const teachClassIDs = coachValue.teachClass.map(students => students.classID);
    for (const student of newJson.find(item => item.category === "student").stuDetail) {
      // 遍歷每位學生的 buyDetail
      for (const buyDetail of student.buyDetail) {
          // 比對 classID 是否在目標 classIDs 中
          if (teachClassIDs.includes(buyDetail.classID)) {
              matchingStudentData.push(student);
              break; // 如果找到符合條件的就跳出內層迴圈
          }
      }
    }

    console.log("count",matchingStudentData)

    let totalSalary = 0
    // 將學生剩餘堂數加到陣列
    matchingStudentData.forEach(item => {
      item.buyDetail.forEach(names => {
        if (teachClassIDs.includes(names.classID)) {
          courseLefts.push(names.courseLeft)
          if (names.courseType === "PT" ) {
            totalSalary +=  names.coursesFIN * coachValue.PtSalary
          }
          else if (names.courseType === "皮拉提斯" ) {
            totalSalary +=  names.coursesFIN * coachValue.PilatesSalary
          }
          else if (names.courseType === "團課" ) {
            totalSalary +=  names.coursesFIN * coachValue.GroupSalary
          }
          else if (names.courseType === "運動按摩" ) {
            totalSalary +=  names.coursesFIN * coachValue.MassageSalary
          }
        }

      })
    })
    console.log("totalSalary",totalSalary)

    // 將學生剩餘堂數加總
    const totalStudentCourseLeft = courseLefts.reduce((accumulator, currentValue) => {
      // 使用 parseInt 函數將字串轉換為數字
      const currentNumber = parseInt(currentValue, 10);
      
      // 檢查轉換後的值是否為有效數字，然後再相加
      if (!isNaN(currentNumber)) {
        return accumulator + currentNumber;
      } else {
        return accumulator;
      }
    }, 0); // 初始值設為 0


    

    return (
      <div className="coach-top-bar">
        <p className="coach-top-bar-item"> 教練本月薪資：{totalSalary}</p>
        {/* 計算所有學員剩餘的堂數總和 */}
        <p className="coach-top-bar-item"> 學員剩餘總堂數：{totalStudentCourseLeft}</p>
    
      </div>
    );
  }
  
export default CoachTopBar;