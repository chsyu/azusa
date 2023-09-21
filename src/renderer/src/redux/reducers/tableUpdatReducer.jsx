// 在您的 Redux reducer 文件中，比如 reducers.js
const initialState = {
    tableData: [], // 初始数据
  };

  const tableUpdatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_TABLE_DATA':
        console.log('UPDATE_TABLE_DATA', action.payload);
        return {
          ...state,
          tableData: action.payload, // 更新数据
        };
      default:
        return state;
    }
  };

  export default tableUpdatReducer;
