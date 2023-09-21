import { Link } from 'react-router-dom'
import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { Typography } from '@mui/material';

function StudentsDetailTable({ stuBuyDetailData }) {
    const [tableData, setTableData] = useState(() => stuBuyDetailData);

    const handleSaveCell = (cell, value) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
      tableData[cell.row.index][cell.column.id] = value;
      //send/receive api updates here
      setTableData([...tableData]); //re-render with new data

    };

    console.log("tableData",tableData)

    const columns = [ //表格有的資料
        {
            accessorKey:"buyDate",
            header:"日期",
            size:100,
            enableEditing:false
        },
        {
            accessorKey:"courseType",
            header:"課程種類",
            size:100,
            filterVariant: 'select',
            enableSorting: false,
            enableEditing:false
        },
        {
            accessorKey:"coursesAll",
            header:"堂數",
            size:100,
            enableSorting: false,
            enableEditing:false
        },
        {
            accessorKey:"coachName",
            header:"教練",
            size:50,
            enableEditing:false
        },
        {
            accessorKey:"payMethod",
            header:"付款方式",
            size:100,
            enableEditing:false
        },
        {
            accessorKey:"coursePrice",
            header:"消費金額",
            size:100,
            enableEditing:false
        },
        {
            accessorKey:"invoiceNum",
            header:"發票號碼",
            size:100,
            enableEditing:false
        },
        {
            accessorKey:"buyNote",
            header:"備註",
            size:100,
            enableSorting: false
        }
    ];

  return (
    <div className="btnbox-item-stu">
        <h3 className='title mt-4'>2023 購買記錄</h3>

        <MaterialReactTable 
            columns={columns}
            data={tableData} 
            initialState={{ showGlobalFilter: true }} //show filters by default
            enableColumnActions={false} //no need for column actions if none of them are enabled
            
            enableDensityToggle={false} //density does not work with memoized table body
            enableFullScreenToggle={false}
            enableHiding={false} //column hiding does not work with memoized table body
            enableStickyHeader
            enableFacetedValues
            editingMode="cell"
            enableEditing     
            muiTableBodyCellEditTextFieldProps={({ cell }) => ({
                //onBlur is more efficient, but could use onChange instead
                onBlur: (event) => {
                handleSaveCell(cell, event.target.value);
                },
            })}
            renderBottomToolbarCustomActions={() => (
                <Typography sx={{  p: '16px', fontWeight:"900" }} variant="body2">
                    雙擊要修改的內容進行修改
                </Typography>
            )}  
        />
    </div>
  )
}

export default StudentsDetailTable