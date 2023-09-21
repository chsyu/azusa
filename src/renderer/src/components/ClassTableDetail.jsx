import React from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link ,useParams} from 'react-router-dom';

function ClassTableDetail({classes}) {

    const AddBGC = ({cell}) => { // 設定邊框
        let e;
    
        if (cell.getValue()  == '快要截止') e = <span style={{backgroundColor:"#dee2e6", padding:"10px", borderRadius:'5px'}}>{cell.getValue()}</span>
        else if (cell.getValue()  == '已截止') e = <span style={{backgroundColor:"#F16D6D", padding:"10px", borderRadius:'5px', color:"white"}}>{cell.getValue()}</span>
        else e = <div>-</div>
        
        return e
    }
    
    const CheckOut = ({renderedCellValue}) => { //設定查看按鈕要進入的頁面
        return<>
           <Link to={`/classes/id/${renderedCellValue}`} className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">查看{renderedCellValue}</button> 
            </Link>
        </>
    };
    
    const AddAlertMode = ({renderedCellValue}) => {
        if (renderedCellValue === '1') return <span className="alert-mode">{renderedCellValue}</span>;
        else return<>{renderedCellValue}</>
    }

    const columns = [ //表格有的資料
        {
            accessorFn: (row) => {
                const newData = row.coach.map((item) => {
                    const coachs = []
                    coachs.push(item.coachName)
                    return coachs
                })
                return `${newData.join("、")} `
              },
            header:"教練",
            filterVariant: 'select',
            size:100,
        },
        {
            accessorKey:"courseType",
            header:"課程種類",
            size:100,
            filterVariant: 'select',
            enableSorting: false
        },
        {
            accessorFn: (row) => {
                const newData = row.student.map((item) => {
                    const students = []
                    students.push(item.stuName)
                    return students
                })
                return `${newData.join("、")} `
              },
            header:"學員",
            size:100,
            enableSorting: false,
            filterVariant: 'select',
        },
        {
            accessorKey:"courseLeft",
            header:"剩餘堂數",
            size:100,
            Cell: AddAlertMode
        },
        {
            accessorKey:"coursesAll",
            header:"總堂數",
            size:100,
            Cell: AddAlertMode
        },
        {
            accessorKey:"exCourse",
            header:"體驗課",
            size:100,
            Cell: ({ renderedCellValue }) => {
                if (renderedCellValue === '是') return <span className="alert-mode">{renderedCellValue}</span>;
                else return<>{renderedCellValue}</>
                
            },
          
        },
        {
            accessorKey:"status",
            header:"狀態",
            size:100,
            Cell: AddBGC,
            filterVariant: 'select',
        },
        {
            accessorKey:"classID",
            header:"操作",
            size:50,
            Cell: CheckOut,
            enableSorting: false

        }
    ];
    
  return (
    
    <MaterialReactTable 
        columns={columns}
        data={classes} 
        initialState={{ showGlobalFilter: true }} //show filters by default
        enableColumnActions={false} //no need for column actions if none of them are enable
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        enableFacetedValues
        renderTopToolbarCustomActions={({table}) => (
            <div>
            <Link to="/classes/form" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">新增課程</button> 
                
            </Link>
            {/* <button onClick={()=> console.log(table.getRowModel().rows)}>ppp</button> */}
            </div>

        )}
                                
    />
                
  )
}

export default ClassTableDetail