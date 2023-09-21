import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    classForm:{
      page1: {
        coachName:'',
        stuName: '',
        stuName2:'',
        coursesAll: '',
        coursePrice:'',
        exCourse:'',
        buyNote: '',
        buyDate:'',
      },
      page2: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        coursePrice:'',
        exCourse:'',
        buyNote: '',
        buyDate:'',
      },
      page3: {
        coachName:'',
        stuName: '',
        coursesAll: '',
        coursePrice:'',
        exCourse:'', 
        buyNote: '',
        buyDate:'',
      },
      page4: {
        coachName:'',
        coursesAll: '',
        coursePrice:'',
        buyNote: '',
        buyDate:'',
      },
      page5: {
        coachName:'',
        floor: '',
        date:'',
        time: '',
        buyNote: '',
        buyDate:'',
      },
    },
  };
  const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      updateClassForm: (state, action) => {
        const { page, data } = action.payload;
        state.classForm[page] = data;
      },
    },
  });
  
  export const { updateClassForm } = formSlice.actions;
  
  export default formSlice.reducer;
  // const formReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'UPDATE_CLASS_FORM':
  //       const { page,data} = action.payload;
  //       return {
  //         ...state,
  //         classForm:{
  //               ...state.classForm,
  //           [page]:data,
         
  //           },
  
  //       };
  
  //     default:
  //       return state;
  //   }
  // };
  
  // export default formReducer;