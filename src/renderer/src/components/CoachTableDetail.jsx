import React from "react";
import { MaterialReactTable } from 'material-react-table';
import { Link } from 'react-router-dom';
import { selectOptions, CheckOut } from './TableSelectOptions'


function CoachTableDetail({classes}) {

    
    const CheckOut = ({renderedCellValue}) => { //設定查看按鈕要進入的頁面
        
        return<>
           <Link to={`/coach/name/${renderedCellValue}`} className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">查看</button> 
            </Link>
        </>
    };
    
    const columns = [ //表格有的資料
        {
            accessorKey:"coachID",
            header:"#",
            size:50,
            enableSorting: false

        },
        {
            accessorKey:"coachName",
            header:"教練",
            size:50,
        },
        {
            accessorKey:"coachGender",
            header:"性別",
            size:50,
            enableSorting: false
        },
        {
            accessorKey:"coachPhone",
            header:"電話",
            size:100,
            enableSorting: false
        },
        {
            accessorFn: (row) => `${row.major.join("、")} `,
            id:"major",
            header:"能帶課程",
            size:150,
            Cell: ({ renderedCellValue }) => (<span>{renderedCellValue}</span>)
            
        },
        {
            accessorKey:"coachNote",
            header:"備註",
            size:100,
            enableSorting: false
        },
        {
            accessorKey:"coachID",
            id:"checkOut",
            header:"操作",
            size:50,
            //Cell: CheckOut,
            Cell: CheckOut, //設定查看按鈕要進入的頁面
            enableSorting: false

        }
    ];
    
    


  return (
    
    <MaterialReactTable 
        columns={columns}
        data={classes} 
        initialState={{ showGlobalFilter: true }} //show filters by default
        enableColumnActions={false} //no need for column actions if none of them are enabled
        enableColumnFilters={false} //filtering does not work with memoized table body
        
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        // enableSorting={false} //sorting does not work with memoized table body
        enableStickyHeader
        renderTopToolbarCustomActions={() => (
            <Link to="/coach/form" className='table-link-underline-none'>
                <button type="button" className="btn btn-golden">新增教練</button> 
            </Link>
        )}
                                
    />
                
  )
}

export default CoachTableDetail