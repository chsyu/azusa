import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    reserveForm: {
        reserveDate:'',
        reserveTime:'',
        reserveStu:'',
    },
  };
  const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      updateReserveForm: (state, action) => {
        state.reserveForm = { ...state.reserveForm, ...action.payload };
      },
    },
  });
  
  export const { updateReserveForm } = formSlice.actions;
  
  export default formSlice.reducer;
  // const formReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'UPDATE_COACH_NAME':
  //       return {
  //         ...state,
  //         reserveForm: {
  //           ...state.reserveForm,
  //           ...action.payload,
  //         },
  //       };
  
  //     default:
  //       return state;
  //   }
  // };
  
  // export default formReducer;