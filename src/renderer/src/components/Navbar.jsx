import React from 'react'
import Logo from '../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
//use hash to check the current page
import hash from 'object-hash'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { checkPageHash } from '../redux/reducers/saveSlice'
import testModified from '../json/test_class.json'
import { setFileName } from '../redux/reducers/saveSlice'


function Navbar() {

  const currentPageHash = useSelector((state) => state.root.save.checkPageHash)
  const oldHash = useSelector((state) => state.root.save.oldHash)
  const isSame = useSelector((state) => state.root.save.isSameObject)
  const dispatch = useDispatch()

  const fileContentOnNav = useSelector((state) => state.root.save.fileName)
  console.log("fileContentOnNav",fileContentOnNav)

  const testJsonModified = hash(fileContentOnNav)

  console.log('oldHash:', oldHash)
  console.log('modifiedHash:', testJsonModified)
  console.log('isSame:', isSame)

  //use for testing
  let tester = {
    id: 2,
    name: 'test',
    coach: 'test',
    student: 'test'
  }

  //let pageState = useSelector(selectPageState)//default page state

  //const oldHash = useRef('')

  // const oldHash = useSelector((state) => state.page.currentPageHash);
  // const dispatch = useDispatch()
  // const currentHash = dispatch(checkPageHash(hash(currentState)));
  // useEffect(() => {
  //   console.log('Old Hash:', oldHash.current)
  //   console.log('Current Hash:', currentHash)
  //   if (oldHash.current != currentHash) {
  //     // save file here
  //     console.log('save file here')
  //     oldHash.current = currentHash

  //   } else {
  //     console.log('no need to save file')
  //   }
  // }, [currentState])

  //save file finction & read function
  const [menuInfo, setMenuInfo] = useState('AzusaSavedFile')
  const [filePathInfo, setFilePathInfo] = useState('')
  const [fileContent, setFileContent] = useState('')
  const { ipcRenderer } = window.electron

  const onSaveToFile = async () => {
    if(!!fileContentOnNav?.newJsonData){
    const data = JSON.stringify(fileContentOnNav)//set the should save json here - use redux's state
    await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
    }
  }

  const onReadFile = async () => {
    const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
      menuInfo: 'no data'
    }
    const content = JSON.parse(data)
    setFileContent(content)
  }
  //console.log(fileContent)

  // useEffect(() => {
  //   ipcRenderer.on('menuInfo', (_, message) => {
  //     setMenuInfo(message)
  //   })
  //   ipcRenderer.on('filePathInfo', (_, filePath) => {
  //     setFilePathInfo(filePath)
  //   })
  //   return () => {
  //     ipcRenderer.removeAllListeners('menuInfo')
  //     ipcRenderer.removeAllListeners('filePathInfo')
  //   }

  // }, [])

  //handle hash function onclick
  const handleHashOnClick = () => {
    //dispatch(checkPageHash(hash(testModified)));
    // dispatch(checkPageHash(hash(tester)))
    dispatch(checkPageHash(hash(fileContentOnNav)))

    // const currentHash = hash(currentState);
    // console.log('Old Hash:', oldHash);
    // console.log('Current Hash:', currentHash);
    // if (oldHash !== currentHash) {
    //   // 执行保存文件的操作，或者您可以发起保存文件的异步操作
    //   console.log('Save file here1');
    //   oldHash = currentHash;
    // } else {
    //   console.log('No need to save file2');
    // }

    if (isSame == false) {
      onSaveToFile()
      console.log('Nav-save file here:',filePathInfo)
    }

    tester.id = tester.id + 1
    console.log('tester.id:', tester.id)
  }

  return (
    <div>
      <div className="nav_logo">
        <img src={Logo} style={{ width: '82px', height: '82px' }} alt="class-unclick" />
      </div>
      <NavLink
        to="/"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
        onClick={handleHashOnClick}
      >
        <FontAwesomeIcon icon={faHouse} />
        <div class="nav-word">課程管理</div>
      </NavLink>

      <NavLink
        to="/student"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
        onClick={handleHashOnClick}
      >
        <FontAwesomeIcon icon={faAddressBook} />
        <div class="nav-word">學員管理</div>
      </NavLink>

      <NavLink
        to="/coach"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
        onClick={handleHashOnClick}
      >
        <FontAwesomeIcon icon={faUser} />
        <div class="nav-word">教練管理</div>
      </NavLink>

      <NavLink
        to="/revenue"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
        onClick={handleHashOnClick}
      >
        <FontAwesomeIcon icon={faSackDollar} />
        <div class="nav-word">金流管理</div>
      </NavLink>

      {/* for detail page testing use */}
      {/* <Link to="/classdetail" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} />
            <div class="nav-word">classdetail</div></Link>
            <Link to="/coachdetail" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} />
            <div class="nav-word">coachdetail</div></Link>
            <Link to="/studentdetail" className="nav-item">
            <FontAwesomeIcon icon={faSackDollar} />
            <div class="nav-word">studentdetail</div></Link> */}


      {/* <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faKey} />
            <div class="nav-word">場地租借</div></Link> */}

{/*存讀檔測試*/}
      <NavLink
        to="/savejson"
        className={({ isActive }) => ['nav-item', isActive ? 'nav-item-active' : null].join(' ')}
        onClick={handleHashOnClick}
      >
        <FontAwesomeIcon icon={faKey} />
        <div class="nav-word">Save Page</div>
      </NavLink>

    </div>

            // {/* <NavLink to="/jsonform" className="nav-item">
            // <FontAwesomeIcon icon={faAddressBook} />
            // <div class="nav-word">Json測試</div></NavLink> */}


  )
}

export default Navbar
