//學員列表box
// import studentValue from "../json/class.json";
import newJson from '../json/new_class.json'

function StudentsList({ coachData }) {
  let stuNum = []
  let stuName = []

  console.log(coachData)
  // 獲取教練所教授的課程的 classID
  const teachClassIDs = coachData.teachClass.map(students => students.classID);

  //使用 classID 在 classDetail 中找到相對應的課程資料
  const classDetailData = newJson.find(item => item.category === "class").classDetail.filter(classData => teachClassIDs.includes(classData.classID));
  console.log(classDetailData);

  classDetailData.forEach(item => {
      item.student.forEach(names => {
        if (!stuNum.includes(names.stuID)) {
          stuName.push(names.stuName)
          stuNum.push(names.stuID)
        }
    })
  })
  console.log(stuNum);
  console.log(stuName);


  for (let i = 0; i < coachData.length + 2; i++) {
    stuNum.push(coachData.student[i].name)
  }


  const numbers = [1, 2, 6, 4, 5]
  const listItems = stuNum.map((number) => (
    <li className="CoachStudentsListBox-item" key={number}>
      {number}
    </li>
  ))

  // const names = ["甜甜","Kevin","來福","Jenny","Ken"];
  const names = ['甜甜', 'Kevin', '來福', 'Jenny', 'Ken']
  const nameItems = stuName.map((name) => (
    <li className="CoachStudentsListBox-item" key={name}>
      {name}
    </li>
  ))

  console.log('students:', coachData.student)

  return (
    <div className="CoachStudentsListContainer">
      <p className="CoachStudentsListTitle">學員列表</p>
      <div className="CoachStudentsList">
        <div className="CoachStudentsListBox">
          <p className="CoachStudentsListBox-item">編號</p>
          <ul className="CoachStudentsListBox-item">{listItems}</ul>
        </div>
        <div className="CoachStudentsListBox">
          <p className="CoachStudentsListBox-item">全部</p>
          <ul className="CoachStudentsListBox-item">{nameItems}</ul>
        </div>
      </div>
    </div>
  )
}

export default StudentsList
