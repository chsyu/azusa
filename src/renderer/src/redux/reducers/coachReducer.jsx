import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  coachForm: {
    coachName:'',
    coachGender: '',
    coachIDcode: '',
    coachPhone:'',
    coachEmail: '',
    coachAddress: '',
    coachBank:'',
    coachContact: '',
    coachRelation:'',
    coachContact_tel:'',
    coachNote:'',
    major: null, // 新增一个字段用于存储按钮选项值
    joinDate:'',
    PtSalary:'',
    PilatesSalary:'',
    GroupSalary:'',
    MassageSalary:'', 
  },
};
// 创建一个 slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateCoachName: (state, action) => {
      state.coachForm = { ...state.coachForm, ...action.payload };
    },
    // 添加其他更新表单的 reducer
  },
});

// 导出 reducer 和 actions
export const { updateCoachName } = formSlice.actions;
export default formSlice.reducer;

// const formReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'UPDATE_COACH_NAME':
//       return {
//         ...state,
//         coachForm: {
//           ...state.coachForm,
//           ...action.payload,
//         },
//       };

//     default:
//       return state;
//   }
// };

// export default formReducer;