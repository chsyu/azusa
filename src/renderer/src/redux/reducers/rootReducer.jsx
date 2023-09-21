import { combineReducers } from 'redux';
import coachReducer from './coachReducer'; // 导入你的 coachReducer
import stuReducer from './stuReducer'
import classReducer from './classReducer'
import reserveReducer from './reserveReducer'
import saveReducer from './saveSlice';
import tableUpdatReducer from './tableUpdatReducer';
// 使用 combineReducers 合并多个 reducer
const rootReducer = combineReducers({
  coach: coachReducer, // 将 coachReducer 添加到 rootReducer 中
  stu:stuReducer,
  class:classReducer,
  reserve:reserveReducer,
  save: saveReducer,
  table: tableUpdatReducer,
  // 如果有其他 reducer，也在这里添加
});

export default rootReducer;