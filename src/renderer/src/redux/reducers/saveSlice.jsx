import { createSlice } from '@reduxjs/toolkit'
import hash from 'object-hash'
// Part1: Define Slice (including reducers and actions)
import originalJson from '../../json/class.json'

const initialState = {
  fileName: {},
  hasInit: false,
  currentPageHash: '',//傳進來的value
  oldHash: hash(originalJson),
  isSameObject: false
}
const saveSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    setFileName:(state, action) => {
      console.log('redux setFileName:', action.payload);
      // const fileName = action.payload;
      state.fileName = action.payload;
    },
    setHasinit: (state, action) => {
      const hasInit = action.payload;
      state.hasInit = hasInit;
    },
    checkPageHash: (state, action) => {
      state.currentPageHash = action.payload
      console.log('currentPageHash:', state.currentPageHash)

      if (state.oldHash == state.currentPageHash) {

        state.isSameObject = true
      } else {
        state.isSameObject = false

      }
      state.oldHash = state.currentPageHash
    }
    //other reducers

  }
})

// export state to global
export const selectFileName = (state) => state.root.save.fileName
export const selectHasInit = (state) => state.root.save.hasInit
export const selectSaveState = (state) => state.root.save.currentPageHash
export const selectOldHash = (state) => state.root.save.oldHash
export const selectIsSamePage = (state) => state.root.save.isSameObject


// export actions to global
export const { checkPageHash, setFileName, setHasinit } = saveSlice.actions

// export reducer to global
export default saveSlice.reducer
