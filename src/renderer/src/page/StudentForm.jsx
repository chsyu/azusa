import React, {useState } from "react";
import Navbar from "../components/Navbar";
import { connect,useDispatch } from 'react-redux';
import { updateStuForm } from '../redux/Actions/formActions'
import jsonData from '../json/new_class.json'

function generateUniqueID(existingIDs) {
  // 找到现有 ID 中的最大值
  const maxID = Math.max(...existingIDs);

  // 将新的 ID 设置为最大值加一
  const newID = maxID + 1;

  return newID.toString(); // 将新的 ID 转换为字符串
}

function StudentForm(props){
  const dispatch = useDispatch(); // 获取dispatch函数的引用
  const initialFormData = {
    stuName:'',
    stuGender: '',
    stuPhone: '',
    stuEmail: '',
    stuAddress: '',
    stuContact: '',
    stuRelation:'',
    stuContact_tel:'',
    stuNote:'',
    createDate:'',
  };
   // 使用useState來創建一個狀態變數，並初始化為空字串
   const [stuForm, setStuForm] = useState(initialFormData);


   // 定義一個處理表單輸入變化的函數
   const handleInputChange = (event) => {
      // 從事件對象中獲取輸入的名稱和值
      const{name,value}=event.target;

      setStuForm ({
        ...stuForm,
        [name]: value,
      });
  };
 
 
  // 提交表單的函數
  const handleSubmit = (event) => {
    event.preventDefault();
    // props.updateStuForm(stuForm)
    dispatch(updateStuForm(stuForm));
    // 在這裡處理表單提交的邏輯，可以使用formData中的值
    console.log('表单数据：', stuForm);

     // 获取已有的学生 ID 列表
    const existingStudentIDs = jsonData.find((item) => item.category === 'student').stuDetail.map((student) => parseInt(student.stuID));
    // 生成唯一的学生ID
    const newStudentID = generateUniqueID(existingStudentIDs);
    // 根据你的需求更新JSON数据
    // 假设你要将新的学生数据添加到"student"类别下
    const newStudentData = {
    stuID: newStudentID,
    stuName: stuForm.stuName,
    stuGender: stuForm.stuGender,
    stuPhone: stuForm.stuPhone,
    stuEmail: stuForm.stuEmail,
    stuAddress: stuForm.stuAddress,
    stuContact: stuForm.stuContact,
    stuRelation:stuForm.stuRelation,
    stuContact_tel:stuForm.stuContact_tel,
    stuNote:stuForm.stuNote,
    createDate:stuForm.createDate,
    buyDetail:[],
  };
    // 导入JSON数据
    const updatedJsonData = [...jsonData];
    // 将新的学生数据添加到JSON中
    updatedJsonData.find((item) => item.category === 'student').stuDetail.push(newStudentData);

    // 清除表单数据为初始状态
    setStuForm(initialFormData);

    // jsonData.push(stuForm);

    console.log(jsonData);


  };

  return (
    <div className="container-fluid">
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar /> 
        </div>
        <div className="col-10 new_class">
          <div className="title_word">
            <p>新增學員</p>
          </div>
            <form className="form" onSubmit={handleSubmit}>
            <div class="form-group">
                    <label for="exampleInputEmail1">建檔日期:</label>
                    <div className="select">
                    <input 
                      id="tel" 
                      type="text" 
                      name="createDate"
                      class="form-select" 
                      value={stuForm.createDate}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">姓名:</label>
                    <div className="select">
                    <input 
                      id="name" 
                      name="stuName"
                      type="text" 
                      class="form-select" 
                      value={stuForm.stuName}
                      onChange={handleInputChange}
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">性別:</label>
                    <div className="select">
                    <input 
                      id="gender"
                      type="text" 
                      name="stuGender"
                      class="form-select" 
                      value={stuForm.stuGender}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">電話:</label>
                    <div className="select">
                    <input 
                      id="tel" 
                      type="text" 
                      name="stuPhone"
                      class="form-select" 
                      value={stuForm.stuPhone}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email:</label>
                    <div className="select">
                    <input 
                      id="email"
                      type="email" 
                      name="stuEmail"
                      class="form-select" 
                      value={stuForm.stuEmail}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">地址:</label>
                    <div className="select">
                    <input 
                      id="address" 
                      type="text" 
                      name="stuAddress"
                      class="form-select"  
                      value={stuForm.stuAddress}
                      onChange={handleInputChange}  
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人姓名:</label>
                    <div className="select">
                    <input 
                      id="contact" 
                      type="text" 
                      name="stuContact"
                      class="form-select" 
                      value={stuForm.stuContact}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">您與他的關係:</label>
                    <div className="select">
                    <input 
                      id="relation" 
                      type="text" 
                      name="stuRelation"
                      class="form-select" 
                      value={stuForm.stuRelation}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">緊急連絡人電話:</label>
                    <div className="select">
                    <input 
                      id="contact_tel" 
                      type="text" 
                      name="stuContact_tel"
                      class="form-select" 
                      value={stuForm.stuContact_tel}
                      onChange={handleInputChange} 
                    ></input>
                    </div>
                </div>
                <div class="form-group2">
                    <label for="exampleInputPassword1">備註:</label>
                    <div className="select">
                    <textarea 
                      id="note" 
                      name="stuNote"
                      class="form-select" 
                      rows="3"
                      value={stuForm.stuNote}
                      onChange={handleInputChange} 
                    ></textarea>
                    </div>  
                </div>
                <div class="form-group3">
                <button type="submit"  class="btn btn-golden" >新增</button>
                
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}


export default StudentForm;