import React, { useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { updateTableData } from "../redux/Actions/saveActions";
import { updateReserveTime } from "../redux/Actions/formActions"
import jsonData from '../json/new_class.json'

  function ReserveTime(props) {
    const dispatch = useDispatch(); // 获取dispatch函数的引用
    const {tableData, setTableData} = props;
    const initialFormData = {
      reserveDate:'',
      reserveTime:'',
      reserveStu:[],
    }
    const [reserveForm, setReserveForm] = useState(initialFormData); // 存儲選擇的日期
    // const [selectedStudents, setSelectedStudents] = useState([]);
    const [matchingStudents, setMatchingStudents] =  useState(new Set());
    const [selectedStudentType, setSelectedStudentType] = useState(new Set()); // 存储选定的学员类型

  const handleInputChange = (event) => {
    const { name, options, value } = event.target;

    if (name === "reserveStu") {
      // 如果用户在下拉菜单中选择了学员，只更新学员名称
      setReserveForm((prevForm) => ({
        ...prevForm,
        [name]: options
          ? Array.from(options)
              .filter((option) => option.selected)
              .map((option) => option.value)
          : [value], // 如果用户未选择任何选项，则使用当前值
      }));

      // 根据所选学员名称在 matchingStudents 中查找相应的学员信息
      // const selectedStudentInfo = matchingStudents.find((student) => student.stuName === value);
      // // 更新选中的学员信息
      // setSelectedStudents(selectedStudentInfo);
    } else {
      // 对于其他表单字段，正常更新
      setReserveForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };


   // 更新 matchingStudents與selectedStudentType的示例
   useEffect(() => {
    const newClassID = props.classes.classID;
    const newMatchingStudents = new Set(); // 使用 Set 来确保唯一性
    const newClassType = props.classes.courseType;
    const newMatchingType = new Set();
    jsonData.find((item) => item.category === 'student').stuDetail.forEach((student) => {
      student.buyDetail.forEach((buyInfo) => {
        if (buyInfo.classID === newClassID ) { //ClassID一樣就放進來
          newMatchingStudents.add({
            stuName: student.stuName,
            stuID: student.stuID,
            courseType: buyInfo.courseType,
          });
        }
        if( buyInfo.courseType === newClassType){ //courseType是團課的放進來
          newMatchingType.add({
            stuName: student.stuName,
            stuID: student.stuID,
            courseType: buyInfo.courseType,
          });
        }
      });
    });

    setMatchingStudents(Array.from(newMatchingStudents));
    setSelectedStudentType(Array.from(newMatchingType));
  }, [props.classes.classID,props.classes.courseType]);

  // console.log('newMatchingStudents:', matchingStudents);
  // console.log('newMatchingType:', selectedStudentType);

const handleSubmit = () => {
  // 获取当前用户选择的学员名称
  dispatch(updateReserveTime(reserveForm));
  const selectedStudentNames = reserveForm.reserveStu;
  //找當前classID裡面的reserveID
  const selectedClass = jsonData.find((item) => item.category === 'class').classDetail.find((classItem) => classItem.classID === props.classes.classID);
  if (selectedClass) {
    const existingReserveIDs = selectedClass.reserveDetail.flatMap((reserve) => parseInt(reserve.reserveID));
    // 计算新的reserveID
    const newReserveID = (existingReserveIDs.length > 0 ? (Math.max(...existingReserveIDs) + 1) : 1).toString();

  // 创建用于新预约数据的对象
  const newReserveData = {
    reserveID: newReserveID,
    reserveDate: reserveForm.reserveDate,
    reserveTime: reserveForm.reserveTime,
    cancel: "",
    attandence: "",
    note: "",
    student: [], // 将在下面更新
  };

  // 更新 reserveDetail > student
  selectedStudentNames.forEach((selectedStudentName) => {
    let selectedStudentInfo;

    // 根据课程类型来选择要添加到学员信息的来源
    if (props.classes.courseType === '團課') {
      selectedStudentInfo = selectedStudentType.find(
        (student) => student.stuName === selectedStudentName
      );
    } else {
      selectedStudentInfo = matchingStudents.find(
        (student) => student.stuName === selectedStudentName
      );
    }

    if (selectedStudentInfo) {
      newReserveData.student.push({
        stuID: selectedStudentInfo.stuID,
        courseType: selectedStudentInfo.courseType,
        stuName: selectedStudentInfo.stuName,
      });
    }
  });

  const updatedJsonData = [...jsonData];

  updatedJsonData.find((item) => item.category === 'class').classDetail.forEach((classItem) => {
    if (classItem.classID === props.classes.classID) { // 替换为你的实际目标 classID
      if (!classItem.reserveDetail) {
        classItem.reserveDetail = []; // 如果没有 reserveDetail 数组，先创建一个
      }

      // classItem.reserveDetail.push(newReserveData);
      // setTableData(classItem.reserveDetail);
      dispatch(updateTableData([...tableData, newReserveData]));

    }
  });

  // 清除表单数据（可选）
  setReserveForm(initialFormData);

  console.log(updatedJsonData);

  }
};
    return (
      <div className="reservetab">
        <p className="reserveboxtitle">學員預約</p>
        <div className="reservebox">
          <div className="reservebox-item">
            <p className="rstitle col-3">日期：</p>
            <div className="DatePicksTitle col-9">
                <input
                  id="datee"
                  class="form-control"
                  type="date"
                  name="reserveDate"
                  value={reserveForm.reserveDate}
                  onChange={handleInputChange}
                />
            </div>
          </div>
          <div className="reservebox-item">
            <p className="rstitle col-3">時間：</p>
            <div className="DatePicksTitle col-9">
                <input
                  id="startDate"
                  class="form-control"
                  type="text"
                  placeholder="例：09:00-11:00"
                  name="reserveTime"
                  value={reserveForm.reserveTime}
                  onChange={handleInputChange}
                />
            </div>
          </div>
          <div className="reservebox-item">
            <p className="rstitle col-3">學員：</p>
            <div className="DatePicksTitle col-9">
             <select
              class="form-control"
               name="reserveStu"
               multiple={true}  // 启用多选功能
               value={reserveForm.reserveStu} // 存储选中的学员名称的数组
              onChange={handleInputChange}
            >
              {props.classes.courseType === '團課'
                ? Array.from(selectedStudentType).map((student) => (
                    <option key={student.stuID} value={student.stuName}>
                      {student.stuName}
                    </option>
                  ))
                : Array.from(matchingStudents).map((student) => (
                    <option key={student.stuID} value={student.stuName}>
                      {student.stuName}
                    </option>
                  ))}
            </select>
            </div>
          </div>
       <div className="mb-4">
            <button
              type="button"
              className="btn btn-golden"
              onClick={handleSubmit}
            >
              確定
            </button>
          </div>
        </div>
      </div>
    );
  }


  export default ReserveTime;
