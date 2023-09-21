import React, {useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import { connect,useDispatch } from 'react-redux';
import { updateClassForm } from '../redux/Actions/formActions'
import jsonData from '../json/new_class.json'

//找ID最大值並往下增加ID
function generateUniqueID(existingIDs) {
  // 找到现有 ID 中的最大值
  const maxID = Math.max(...existingIDs);

  // 将新的 ID 设置为最大值加一
  const newID = maxID + 1;

  return newID.toString(); // 将新的 ID 转换为字符串
}
//找學生ID
function findStudentIDByName(studentName) {
  const studentData = jsonData.find((item) => item.category === 'student');
  const student = studentData.stuDetail.find((student) => student.stuName === studentName);
  return student ? student.stuID : ''; // 如果找到学生，返回学生ID，否则返回空字符串
}
//找教練ID
function findCoachIDByName(CoachName) {
  const coachData = jsonData.find((item) => item.category === 'coach');
  const coach = coachData.coachDetail.find((coach) => coach.coachName === CoachName);
  return coach ? coach.coachID : ''; 
}
//找預約ID (((待修理
function generateUniqueReserveID(reserveDetailArray) {
  let newReserveID = 1; // 默认从1开始
  while (reserveDetailArray.some((item) => item.reserveID === newReserveID.toString())) {
    newReserveID++; // 如果存在就递增
  }
  return newReserveID.toString();
}

function ClassForm(props) {
  const dispatch = useDispatch(); // 获取dispatch函数的引用
  //設定每個分頁的初始狀態
  const initialFormData = {
    page1: {
      coachName:'',
      stuName: '',
      stuName2:'',
      coursesAll: '',
      coursePrice:'',
      exCourse:'',
      buyNote: '',
    },
    page2: {
      coachName:'',
      stuName: '',
      coursesAll: '',
      coursePrice:'',
      exCourse:'',
      buyNote: '',
    },
    page3: {
      coachName:'',
      stuName: '',
      coursesAll: '',
      coursePrice:'',
      exCourse:'',
      buyNote: '',
    },
    page4: {
      coachName:'',
      buyNote: '',
    },
    page5: {
      stuName: '',
      coursesAll: '',
      coursePrice:'',
      exCourse:'',
      buyNote: '',
    },
    page6: {
      coachName:'',
      floor: '',
      date:'',
      time: '',
      buyNote: '',
    },
  };
// 使用状态管理保存表单数据
const [classForm, setClassForm] = useState(initialFormData);
const [currentPage, setCurrentPage] = useState('page1');   // 使用状态管理保存当前页面
const [studentNames, setStudentNames] = useState([]);
const [coachNames, setCoachNames] = useState([]);
const [selectedCourse, setSelectedCourse] = useState(''); // 用于存储当前所选的课程名称

 // 处理分頁点击按钮事件
 const handleButtonClick = (page, courseName) => {
  setCurrentPage(page);
  setSelectedCourse(courseName); // 更新所选的课程名称
};

// 定義一個處理表單輸入變化的函數
const handleInputChange = (event,page) => {
  // 從事件對象中獲取輸入的名稱和值
  const{name,value}=event.target;

  setClassForm((prevFormData) => ({
    ...prevFormData,
    [page]: {
      ...prevFormData[page],
      [name]: value,
    },
  }));
  
  //下拉選單選學員的名稱，找出學員、教練對應的ID
  if (name === 'stuName') {
      // 构建新购买详情对象
      setClassForm((prevFormData) => ({
        ...prevFormData,
        [page]: {
          ...prevFormData[page],
          stuName: value, // 学员的名称
          stuID: findStudentIDByName(classForm[currentPage].stuName), 
        },
      }));
  } else
    if (name === 'coachName') {
      setClassForm((prevFormData) => ({
        ...prevFormData,
        [page]: {
          ...prevFormData[page],
          coachName: value, 
          coachID: findCoachIDByName(classForm[currentPage].coachName), 
        },
      }));
  }
  else {
    // 非学员名字字段的处理逻辑，直接更新表单数据
    setClassForm((prevFormData) => ({
      ...prevFormData,
      [page]: {
        ...prevFormData[page],
        [name]: value,
      },
    }));
  }
  
};

// 处理 radio 按钮的变化
const handleRadioChange = (event, page) => {
  const { value } = event.target;
  // 更新选定的 radio 按钮值
  setClassForm((prevFormData) => ({
    ...prevFormData,
    [page]: {
      ...prevFormData[page],
      exCourse: value,
    },
  }));
  
};

const handleSubmit = (event) => {
  event.preventDefault();
  // props.updateClassForm(currentPage,classForm[currentPage])
  dispatch(updateClassForm(currentPage,classForm[currentPage]));
  // 获取已有的 classID 列表
 const existingClassIDs = jsonData
 .find((item) => item.category === 'class')
 .classDetail.map((class_category) => parseInt(class_category.classID));
 const newClassID = generateUniqueID(existingClassIDs)
// 获取已有的 stuID 列表
//   const existingStudentIDs = jsonData
//  .find((item) => item.category === 'student')
//  .stuDetail.map((student) => parseInt(student.stuID));
// //  const newStuID = generateUniqueID(existingStudentIDs)
// 获取已有的 class 数据
const classData = jsonData.find((item) => item.category === 'class');

const newClassItem = {
  classID: newClassID, 
  courseType: selectedCourse, 
  exCourse: classForm[currentPage].exCourse, 
  coursesAll: classForm[currentPage].coursesAll, 
  reserveDetail:[],
  coach:[],
  student:[],
};
if (currentPage !== 'page5') {
// 推送新的 class 数据对象到 class 数据数组中
classData.classDetail.push(newClassItem);
}


//傳到classDetail下的student
const classIDToUpdate = newClassID; // 你已经找到的课程ID
// 找到要更新的课程对象
const classDetailToUpdate = jsonData
  .find((item) => item.category === 'class')
  .classDetail.find((classItem) => classItem.classID === classIDToUpdate);
// 获取已有的预约ID列表
const existingReserveIDs = jsonData
  .find((item) => item.category === 'class')
  .classDetail.flatMap((classItem) => 
    classItem.reserveDetail.map((reserveItem) => reserveItem.reserveID)
  );


//classDetail>student&coach
if (classDetailToUpdate) {
  const newClassStudent = [
    {
      stuID: findStudentIDByName(classForm[currentPage].stuName),
      courseType: selectedCourse, 
      stuName: classForm[currentPage].stuName,
    },
    {
      stuID: findStudentIDByName(classForm[currentPage].stuName2),
      courseType: selectedCourse,
      stuName: classForm[currentPage].stuName2,
    },
  ];
  const newClassStudent2 = {
    stuID: findStudentIDByName(classForm[currentPage].stuName),
      courseType: selectedCourse, 
      stuName: classForm[currentPage].stuName,
  }
  const newClassCoach = {
    coachID: findCoachIDByName(classForm[currentPage].coachName),
    coachName: classForm[currentPage].coachName,
  }
  // 添加学生信息到课程对象的 "student、coach" 数组中
  if (currentPage == 'page1') {
  classDetailToUpdate.student.push(...newClassStudent);
  classDetailToUpdate.coach.push(newClassCoach);
  }
  else{
  classDetailToUpdate.student.push(newClassStudent2);
  classDetailToUpdate.coach.push(newClassCoach);
  }
}

//coach>coachDetail>TeachClass
  const newTeachClass ={
    classID: newClassID,
  } 
  const selectedCoachName = classForm[currentPage].coachName;
  const selectedCoach = jsonData
    .find((item) => item.category === 'coach')
    .coachDetail.find((coach) => coach.coachName === selectedCoachName);
  if (selectedCoach) {

    selectedCoach.teachClass.push(newTeachClass);
  }

 // 要加到BuyDetail的資料
 const newBuyDetail = {
  classID: newClassID,
  coachName: classForm[currentPage].coachName,
  // stuName: classForm[currentPage].stuName,
  // stuName2: classForm[currentPage].stuName2,
  coursesAll: classForm[currentPage].coursesAll,
  coursePrice: classForm[currentPage].coursePrice,
  courseType: selectedCourse,
  exCourse: classForm[currentPage].exCourse,
  buyNote: classForm[currentPage].buyNote,
  courseLeft:'',
  coursesFIN:'',
  invoiceNum:'',
  patMethod:'',
  preCourseLeft:'',
};
  // 在这里处理表单提交的逻辑
  console.log('表单数据：', classForm);

  // 找出ID對應的學員，把BuyDetail資料放進去
  const selectedStudentName = classForm[currentPage].stuName;
  const selectedStudent = jsonData
    .find((item) => item.category === 'student')
    .stuDetail.find((student) => student.stuName === selectedStudentName);

  if (selectedStudent) {
    // const selectedStudentID = selectedStudent.stuID;
    selectedStudent.buyDetail.push(newBuyDetail);
    // 输出更新后的 jsonData
  } 
   //傳遞學員2的資料到BuyDetail頁面
   const selectedStudentName2 = classForm[currentPage].stuName2;
   const selectedStudent2 = jsonData
   .find((item) => item.category === 'student')
   .stuDetail.find((student) => student.stuName === selectedStudentName2);
   if(selectedStudent2){
     selectedStudent2.buyDetail.push(newBuyDetail);
   }

   // 清除表单数据为初始状态
   setClassForm(initialFormData);

   // 恢复 radio 按钮的原状，将 exCourse 重置为空字符串
   setClassForm((prevFormData) => ({
     ...prevFormData,
     [currentPage]: {
       ...prevFormData[currentPage],
       exCourse: '',
     },
   }));
   console.log(jsonData);
};

//繳費按鈕
const initialButtonData = [
  { text: '已付款', clicked: false, visible: true },
  { text: '未付款', clicked: false, visible: true },

];
const [buttons, setButtons] = useState(initialButtonData);
const handleClick = (index, buttonValue) => {
  // 处理按钮的点击事件，根据索引来确定点击的按钮
  const updatedButtons = [...buttons];
  updatedButtons[index].clicked = true;
  setButtons(updatedButtons);

  // 切换按钮的文本内容
  const updatedText = buttons[index].text === '未付款' ? '已付款' : '未付款';
  const updatedButtonsText = [...buttons];
  updatedButtonsText[index].text = updatedText;
  setButtons(updatedButtonsText);

  console.log('点击的按钮值：', buttonValue);

};

//下拉選單
useEffect(() => {
  // 从 JSON 数据中提取学员名字的列表
  const studentData = jsonData.find((item) => item.category === 'student');
  const studentNames = studentData.stuDetail.map((student) => student.stuName);
  const coachData = jsonData.find((item) => item.category === 'coach');
  const coachNames = coachData.coachDetail.map((coach) => coach.coachName);

  // 更新学员名字列表的状态变量
  setStudentNames(studentNames);
  setCoachNames(coachNames);
}, []); // 空数组表示仅在组件加载时运行

  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class">
          <div className="title_word">
            <p>新增課程</p>
          </div>
         
          <form className="form"  onSubmit={handleSubmit}>
              <div class="form-group">
                  <label for="exampleInputEmail1">種類:</label>
                  <div className="form_btn">
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page1' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page1','PT')}>PT</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page2' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page2','皮拉提斯')}>皮拉提斯</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page3' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page3','運動按摩')}>運動按摩</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page4' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page4','團課')}>團課教練</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page5' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page5','團課')}>團課學員</button>
                    <button className={`btn btn-outline-golden page-button ${currentPage === 'page6' ? 'active' : ''}`} type="button" onClick={() => handleButtonClick('page6','場地租借')}>場地租借</button>
                  </div>
              </div>
              {/* PT課 */}
              {currentPage === 'page1' && (
                <div className="class_category">
                    <div className="form-group">
                        <label  for="exampleInputEmail1">教練:</label>
                        <div className="select">
                          <select className="form-select" 
                          name="coachName"
                          value={classForm.page1.coachName}
                          onChange={(e) => handleInputChange(e, 'page1')}
                          >
                            <option selected>-</option>
                              {coachNames.map((name) => (
                              <option key={name} value={name}>
                              {name}
                            </option>
                            ))}
                          </select>
                        </div>
                    </div>
                    <div className="form-group4">
                      <div className="form-group4-1"> 
                        <label for="exampleInputEmail1">學員1:</label>
                        <div className="select">
                        <select 
                          class="form-select" 
                          name="stuName"
                          value={classForm.page1.stuName}
                          onChange={(e) => handleInputChange(e, 'page1')}
                        >
                            <option selected>-</option>
                              {studentNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                            </option>
                            ))}
                        </select>
                        </div>
                        </div>
                        {buttons[0].visible && (
                          <button
                            type="button"
                            className={`btn btn-originalgray ${buttons[0].clicked ? 'active' : ''}`}
                            onClick={() => handleClick(0, buttons[0].text)}
                          >
                            {buttons[0].text}
                          </button>
                        )}
                        {/* <button className="btn btn-originalgray" type="button">已付費</button> */}
                    </div>
                    <div className="form-group4"> 
                      <div className="form-group4-1">
                          <label for="exampleInputEmail1">學員2:</label>
                          <div className="select">
                            <select 
                            class="form-select " 
                            name="stuName2"
                            value={classForm.page1.stuName2}
                            onChange={(e) => handleInputChange(e, 'page1')}
                            >
                              <option selected>-</option>
                                {studentNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                            </select>
                          </div>
                      </div>
                      {buttons[1].visible && (
                          <div>
                            <button
                              type="button"
                              className={`btn btn-originalgray ${buttons[1].clicked ? 'active' : ''}`}
                              onClick={() => handleClick(1, buttons[1].text)}
                            >
                              {buttons[1].text}
                            </button>
                          </div>
                        )}
                      {/* <button className="btn btn-originalgray" type="button">未付費</button> */}
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">堂數:</label>
                        <div className="select">
                          <select 
                            class="form-select" 
                            name="coursesAll"
                            value={classForm.page1.coursesAll}
                            onChange={(e) => handleInputChange(e, 'page1')}
                          >
                              <option selected>-</option>
                              <option value="1">1</option>
                              <option value="10">10</option>
                          </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">購買價格:</label>
                        <div className="select">
                          <input 
                            type="text" 
                            class="form-select"
                            name="coursePrice"
                            value={classForm.page1.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page1')}
                          ></input>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label  className="" for="exampleInputEmail1">體驗課:</label>
                        <div className=" check">
                          <div class="form-check">
                            <input 
                              //class="form-check-input" 
                              type="radio"
                              name="exCourse" // 同一组 radio 按钮要使用相同的 name
                              value="是"
                              className={`form-check-input ${classForm.page1.exCourse === 'option1' ? 'checked' : ''}`}
                              // checked={classForm.page1.selectedOption === 'option1'}
                              onChange={(e) => handleRadioChange(e, 'page1')} // 传递页面名称
                             ></input>
                            <label class="form-check-label" for="flexRadioDefault1">
                              是
                            </label>
                          </div>
                          <div class="form-check">
                            <input 
                              type="radio"
                              name="exCourse" // 同一组 radio 按钮要使用相同的 name
                              value="否"
                              className={`form-check-input ${classForm.page1.exCourse === 'option2' ? 'checked' : ''}`}
                              // checked={classForm.page1.selectedOption === 'option2'}
                              onChange={(e) => handleRadioChange(e, 'page1')} // 传递页面名称
                             ></input>
                            <label class="form-check-label" for="flexRadioDefault2">
                              否
                            </label>
                        </div>
                    </div>
                    </div>
                    <div class="form-group2">
                        <label for="exampleInputPassword1">備註:</label>
                        <div className="select">
                          <textarea 
                          class="form-select" 
                          id="exampleFormControlTextarea1" 
                          rows="3" 
                          name="buyNote"
                          value={classForm.page1.buyNote}
                          onChange={(e) => handleInputChange(e, 'page1')}
                          ></textarea>
                        </div>  
                    </div>
                    <div class="form-group3">
                      <button type="submit" onClick={handleSubmit}class="btn btn-golden" >新增</button>
                    </div>
                </div>
                )}
               {/* 皮拉提斯課 */}
               {currentPage === 'page2' && (
                <div className="class_category">
                      <div className="form-group">
                          <label  for="exampleInputEmail1">教練:</label>
                          <div className="select">
                            <select 
                              className="form-select " 
                              name="coachName"
                              value={classForm.page2.coachName}
                              onChange={(e) => handleInputChange(e, 'page2')} 
                            >
                              <option selected>-</option>
                                {coachNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                              ))}
                            </select>
                          </div>
                      </div>
                      <div className="form-group4">
                        <div className="form-group4-1"> 
                          <label for="exampleInputEmail1">學員:</label>
                          <div className="select">
                          <select 
                            class="form-select"
                            name="stuName"
                            value={classForm.page2.stuName}
                            onChange={(e) => handleInputChange(e, 'page2')} 
                          >
                            <option selected>-</option>
                              {studentNames.map((name) => (
                              <option key={name} value={name}>
                              {name}
                            </option>
                            ))}
                          </select>
                          </div>
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="coursesAll"
                              value={classForm.page2.coursesAll}
                              onChange={(e) => handleInputChange(e, 'page2')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">購買價格:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="coursePrice"
                            value={classForm.page2.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page2')}
                            ></input>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="是"
                               className={`form-check-input ${classForm.page2.exCourse === 'option1' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page2')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault1">
                                是
                              </label>
                            </div>
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="否"
                               className={`form-check-input ${classForm.page2.exCourse === 'option2' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page2')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault2">
                                否
                              </label>
                          </div>
                      </div>
                      </div>
                      <div class="form-group2">
                          <label for="exampleInputPassword1">備註:</label>
                          <div className="select">
                            <textarea 
                            class="form-select" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            name="buyNote"
                            value={classForm.page2.buyNote}
                            onChange={(e) => handleInputChange(e, 'page2')}
                            ></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>
              )}
               {/* 運動按摩 */}
               {currentPage === 'page3' && (
                <div className="class_category">
                      <div className="form-group">
                          <label  for="exampleInputEmail1">教練:</label>
                          <div className="select">
                            <select 
                              className="form-select " 
                              name="coachName"
                              value={classForm.page3.coachName}
                              onChange={(e) => handleInputChange(e, 'page3')} 
                            >
                              <option selected>-</option>
                                {coachNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                              ))}
                            </select>
                          </div>
                      </div>
                      <div className="form-group4">
                        <div className="form-group4-1"> 
                          <label for="exampleInputEmail1">學員:</label>
                          <div className="select">
                          <select 
                            class="form-select"
                            name="stuName"
                            value={classForm.page3.stuName}
                            onChange={(e) => handleInputChange(e, 'page3')} 
                          >
                              <option selected>-</option>
                                {studentNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                          </div>
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="coursesAll"
                              value={classForm.page3.coursesAll}
                              onChange={(e) => handleInputChange(e, 'page3')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">購買價格:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="coursePrice"
                            value={classForm.page3.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page3')}
                            ></input>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="是"
                               className={`form-check-input ${classForm.page3.exCourse === 'option1' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page3')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault1">
                                是
                              </label>
                            </div>
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="否"
                               className={`form-check-input ${classForm.page3.exCourse === 'option2' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page3')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault2">
                                否
                              </label>
                          </div>
                      </div>
                      </div>
                      <div class="form-group2">
                          <label for="exampleInputPassword1">備註:</label>
                          <div className="select">
                            <textarea 
                            class="form-select" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            name="buyNote"
                            value={classForm.page3.buyNote}
                            onChange={(e) => handleInputChange(e, 'page3')}
                            ></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>
              )}
              {/* 團課教練 */}
              {currentPage === 'page4' && (
                <div className="class_category">
                      <div className="form-group">
                          <label  for="exampleInputEmail1">教練:</label>
                          <div className="select">
                            <select 
                              className="form-select " 
                              name="coachName"
                              value={classForm.page4.coachName}
                              onChange={(e) => handleInputChange(e, 'page4')} 
                            >
                              <option selected>-</option>
                                {coachNames.map((name) => (
                                <option key={name} value={name}>
                                {name}
                              </option>
                              ))}
                            </select>
                          </div>
                      </div>
                      <div class="form-group2">
                          <label for="exampleInputPassword1">備註:</label>
                          <div className="select">
                            <textarea 
                            class="form-select" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            name="buyNote"
                            value={classForm.page4.buyNote}
                            onChange={(e) => handleInputChange(e, 'page4')}
                            ></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>
              )}
               {/* 團課學員 */}
               {currentPage === 'page5' && (
                <div className="class_category">
                      <div className="form-group4">
                        <div className="form-group4-1"> 
                          <label for="exampleInputEmail1">學員:</label>
                          <div className="select">
                          <select 
                            class="form-select"
                            name="stuName"
                            value={classForm.page5.stuName}
                            onChange={(e) => handleInputChange(e, 'page5')} 
                          >
                            <option selected>-</option>
                              {studentNames.map((name) => (
                              <option key={name} value={name}>
                              {name}
                            </option>
                            ))}
                          </select>
                          </div>
                          </div>
                          <button className="btn btn-originalgray" type="button">已付費</button>
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">堂數:</label>
                          <div className="select">
                            <select 
                              class="form-select" 
                              name="coursesAll"
                              value={classForm.page5.coursesAll}
                              onChange={(e) => handleInputChange(e, 'page5')}
                            >
                                <option selected>-</option>
                                <option value="1">1</option>
                                <option value="10">10</option>
                            </select>
                          </div>
                      </div>
                      <div class="form-group">
                          <label for="exampleInputEmail1">購買價格:</label>
                          <div className="select">
                            <input 
                            type="text" 
                            class="form-select"
                            name="coursePrice"
                            value={classForm.page5.coursePrice}
                            onChange={(e) => handleInputChange(e, 'page5')}
                            ></input>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label  className="" for="exampleInputEmail1">體驗課:</label>
                          <div className=" check">
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="是"
                               className={`form-check-input ${classForm.page5.exCourse === 'option1' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page5')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault1">
                                是
                              </label>
                            </div>
                            <div class="form-check">
                              <input 
                               type="radio"
                               name="exCourse" // 同一组 radio 按钮要使用相同的 name
                               value="否"
                               className={`form-check-input ${classForm.page5.exCourse === 'option2' ? 'checked' : ''}`}
                               // checked={classForm.page1.selectedOption === 'option2'}
                               onChange={(e) => handleRadioChange(e, 'page5')} // 传递页面名称
                              ></input>
                              <label class="form-check-label" for="flexRadioDefault2">
                                否
                              </label>
                          </div>
                      </div>
                      </div>
                      <div class="form-group2">
                          <label for="exampleInputPassword1">備註:</label>
                          <div className="select">
                            <textarea 
                            class="form-select" 
                            id="exampleFormControlTextarea1" 
                            rows="3" 
                            name="buyNote"
                            value={classForm.page5.buyNote}
                            onChange={(e) => handleInputChange(e, 'page5')}
                            ></textarea>
                          </div>  
                      </div>
                      <div class="form-group3">
                        <button type="submit" class="btn btn-golden" >新增</button>
                      </div>
                  </div>
              )}
               {/* 場租 */}
               {currentPage === 'page6' && (
                <div className="class_category">
                        <div className="form-group">
                            <label  for="exampleInputEmail1">教練:</label>
                            <div className="select">
                              <select 
                                className="form-select " 
                                name="coachName"
                                value={classForm.page6.coachName}
                                onChange={(e) => handleInputChange(e, 'page6')}
                              >
                                <option selected>-</option>
                                  {coachNames.map((name) => (
                                  <option key={name} value={name}>
                                  {name}
                                </option>
                                ))}
                              </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  for="exampleInputEmail1">樓層:</label>
                            <div className="select">
                              <select 
                                className="form-select " 
                                name="floor"
                                value={classForm.page6.floor}
                                onChange={(e) => handleInputChange(e, 'page6')}
                              >
                                  <option selected>-</option>
                                  <option value="1">1樓</option>
                                  <option value="2">2樓</option>
                                  <option value="3">3樓</option>
                                  <option value="4">4樓</option>
                              </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">日期:</label>
                            <div className="select">
                              <input 
                                type="text" 
                                class="form-select" 
                                name="date"
                                value={classForm.page6.date}
                                onChange={(e) => handleInputChange(e, 'page6')}
                              ></input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">時間:</label>
                            <div className="select">
                              <input 
                                type="text" 
                                class="form-select" 
                                name="time"
                                value={classForm.page6.time}
                                onChange={(e) => handleInputChange(e, 'page6')}
                              ></input>
                            </div>
                        </div>
                        <div class="form-group2">
                            <label for="exampleInputPassword1">備註:</label>
                            <div className="select">
                              <textarea 
                                class="form-select" 
                                id="exampleFormControlTextarea1" 
                                rows="3" 
                                name="buyNote"
                                value={classForm.page6.buyNote}
                                onChange={(e) => handleInputChange(e, 'page6')}
                              ></textarea>
                            </div>  
                        </div>
                        <div class="form-group3">
                          <button type="submit" class="btn btn-golden">新增</button>
                        </div>
                    </div>
                     )}
                </form>
              </div>
              <div>
             
              </div>
        </div>
      </div>
  )
  }
  
  
  export default ClassForm;

// import React from 'react';
// import { useSelector } from 'react-redux';
// function ClassForm() {
//   const coachForm = useSelector((state) => state.root.coach.coachForm);
//   const stuForm = useSelector((state) => state.root.stu.stuForm);
// const classForm = useSelector((state) => state.root.class.classForm);
//   // const { coachForm } = props;
//   // console.log(props);
//   console.log(coachForm);
//   console.log(stuForm);
//   return (
//     <div>
//       {/* 使用从 Redux Store 中提取的 JSON 数据来渲染 */}
//       <pre>{JSON.stringify(coachForm, null, 2)}</pre>
//       <pre>{JSON.stringify(stuForm, null, 2)}</pre>
// <pre>{JSON.stringify(classForm, null, 2)}</pre>
//      </div>
//   );
// }


// export default ClassForm;