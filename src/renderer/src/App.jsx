// import Form from './page/Form'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ClassTable from './page/ClassTable'
import StudentTable from './page/StudentTable'
import CoachTable from './page/CoachTable'
import Revenue from './page/Revenue'

import ClassForm from './page/ClassForm'
import StudentForm from './page/StudentForm'
import CoachFrom from './page/CoachForm'

import ClassDetail from './page/ClassDetail'
import CoachDetail from './page/CoachDetail'
import StudentDetail from './page/StudentDetail'

//json test data
import classes from './json/class.json'
import testClass from './json/test_class.json'
import newJson from './json/new_class.json'
//test page
import SaveJsonPage from './page/SaveJsonPage'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setFileName } from './redux/reducers/saveSlice'
import { setHasinit } from './redux/reducers/saveSlice'
import { selectFileName } from './redux/reducers/saveSlice'
import { selectHasInit } from './redux/reducers/saveSlice'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  //save file function & read function
  const [menuInfo, setMenuInfo] = useState('AzusaSavedFile')
  const [filePathInfo, setFilePathInfo] = useState('')
  const dispatch = useDispatch()

  //use redux state variable
  const fileContent = useSelector(selectFileName)

  console.log('fileContent in App.jsx:', fileContent)
  const hasInit = useSelector((state) => state.root.save.hasInit)
  const { ipcRenderer } = window.electron

  const onSaveToFile = async () => {
    const data = JSON.stringify({ jsonData })
    await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
  }
  const onReadFile = async () => {
    const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
      menuInfo: 'no data'
    }
    const content = JSON.parse(data)
    //setFileContent(content)
    dispatch(setFileName(content))
  }

  //ready to close window and save file
  const onReadyToCloseWindows = async () => {
    console.log("fileContentjson_content:", fileContent)
    console.log("fileContentjson_check:", fileContent.newJsonData, !!fileContent.newJasonData)

    if (!!fileContent?.newJsonData) {
      console.log("fileContentjson has content to save:", fileContent)
      const data = JSON.stringify(fileContent)
      await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
    }
    console.log('ready to call api.closeWindow')
    window.api.closeWindow();
  }

  const onInitState = async () => {
    try {
      const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
        menuInfo: 'no data'
      }
      // console.log('data', data)
      const content = JSON.parse(data)
      dispatch(setFileName(content))
    } catch (err) {
      console.log("沒有檔案可以讀取")
    }
  }


  useEffect(() => {
    console.log('useEffect fileContent:', fileContent)
  }, [fileContent])


  console.log("is init??:", hasInit)

  useEffect(() => {
    if (!hasInit) {
      dispatch(setHasinit(true))
      onInitState()
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
    ipcRenderer.on('filePathInfo', (_, filePath) => {
      setFilePathInfo(filePath)
    })
    ipcRenderer.on('readyToClose', (_) => {
      onReadyToCloseWindows();
    })
    //now use hasInit flag to stop listening
    // return () => {
    //   ipcRenderer.removeAllListeners('menuInfo')
    //   ipcRenderer.removeAllListeners('filePathInfo')
    // }
  }, [])

  return (
    isLoading || !fileContent.newJsonData ? (<div>loading...</div>) : (
      <HashRouter>
        <Routes>
          <Route path="/" element={<ClassTable classes={fileContent.newJsonData} />} />
          <Route path="/student" element={<StudentTable classes={fileContent.newJsonData} />}></Route>
          {/* <Route path="/coach" element={<CoachTable classes={newJson} />} /> */}
          <Route path="/coach" element={<CoachTable classes={fileContent.newJsonData} />} />
          <Route path="/revenue" element={<Revenue classes={classes} />} />

          <Route path="classes">
            <Route path="form" element={<ClassForm />} />
            <Route path="id/:id" element={<ClassDetail classes={fileContent.newJsonData} />} />
          </Route>

          <Route path="/student">
            <Route path="form" element={<StudentForm />} />
            <Route path="name/:stuID" element={<StudentDetail classes={fileContent.newJsonData} />} />
          </Route>

          <Route path="/coach">

            <Route path="form" element={<CoachFrom classes={classes} />} />
            {/* <Route path="name/:coachID" element={<CoachDetail classes={newJson} />} /> */}
            <Route path="name/:coachID" element={<CoachDetail classes={fileContent.newJsonData} />} />

          </Route>

          <Route path="/savejson" element={<SaveJsonPage />} />
        </Routes>
      </HashRouter>
    )
  )
}

export default App
