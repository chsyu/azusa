import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateTableData } from '../redux/Actions/saveActions'; // 导入您的更新动作
// import jsonData from '../json/new_class.json'

function ClassDetailTable({ classes, tableData, setTableData, courseLeft, setCourseLeft, splitClasses }) {
  const dispatch = useDispatch();


  const handleSaveCell = useCallback( // 儲存修改的資料
    (cell, value, splitClasses, row) => {
      const stuItem = [] //找到這一row的stuID
      row.original.student.forEach(item => {
        stuItem.push(item.stuID)
      })

      const filteredStudents = classes
        .find(item => item.category === "student") // 找到包含学生信息的数据项
        .stuDetail
        .filter(student => stuItem.includes(student.stuID))

      console.log("test01", classes)
      console.log("test02", cell.row.original)
      console.log("filteredStudents", tableData)
      if (tableData[cell.row.index][cell.column.id] !== value) {
        //send api delete request here, then refetch or update local table data for re-render
        // let newTableData = [...tableData];

        let newTableData = tableData.map((item, index) => {
          if (index === cell.row.index) {
            return {
              ...item,
              [cell.column.id]: value
            }
          }
          return item
        });

        // newTableData = Object.assign([...tableData], {
        //   [cell.row.index]: Object.assign([...tableData[cell.row.index]], {
        //     [cell.column.id]: value
        //   })
        // });
        console.log("test03_compare_value", newTableData[cell.row.index][cell.column.id], value)


        setTableData({ ...newTableData, id});  // 更新到 Redux

        // if ( cell.row.original.cancel == "否" && cell.row.original.attandence == "是"){
        //     //預約且來了，扣課堂數
        //     splitClasses.coursesFIN = parseInt(splitClasses.coursesFIN, 10) + 1
        //     splitClasses.courseLeft = parseInt(splitClasses.courseLeft, 10) - 1
        // filteredStudents.forEach(student => {
        //     student.buyDetail = student.buyDetail.map(detail => {
        //       if (detail.classID === splitClasses.classID) {
        //         // 如果 classID 匹配目标 classID，则修改 courseLEFT 和 courseFIN 的值
        //         detail.coursesFIN = parseInt(detail.coursesFIN, 10) + 1
        //         detail.courseLeft = parseInt(detail.courseLeft, 10) - 1
        //       }
        //       return detail;
        //     });
        //   });
        // console.log("預約且來了，扣課堂數")
        // console.log("splitClasses", splitClasses)
        // console.log("coursesFIN", splitClasses.coursesFIN)
        // console.log("courseLeft", splitClasses.courseLeft)
        // console.log("filteredStudents",filteredStudents)
        dispatch(updateTableData(newTableData));
      }
      // else if ( cell.row.original.cancel == "是" && cell.row.original.attandence == "是"){
      //     //取消預約卻出現
      //     !confirm(`學生出席跟預約有錯誤，不會取消預約卻來上課`)
      //     console.log("錯誤")
      // }
      // else if ( cell.row.original.cancel == "是" && cell.row.original.attandence == "否"){
      //     //取消預約，課堂數回來
      //     splitClasses.coursesFIN = parseInt(splitClasses.coursesFIN, 10) - 1
      //     splitClasses.courseLeft = parseInt(splitClasses.courseLeft, 10) + 1
      //     filteredStudents.forEach(student => {
      //         student.buyDetail = student.buyDetail.map(detail => {
      //           if (detail.classID === splitClasses.classID) {
      //             // 如果 classID 匹配目标 classID，则修改 courseLEFT 和 courseFIN 的值
      //             detail.coursesFIN = parseInt(detail.coursesFIN, 10) - 1
      //             detail.courseLeft = parseInt(detail.courseLeft, 10) + 1
      //           }
      //           return detail;
      //         });
      //       });
      //     console.log("取消預約，課堂數回來")
      //     console.log("splitClasses", splitClasses)
      //     console.log("coursesFIN", splitClasses.coursesFIN)
      //     console.log("courseLeft", splitClasses.courseLeft)
      //     console.log("filteredStudents",filteredStudents)
      // }
      else if (cell.row.original.attandence == "否") {
        //預約了，但沒來上課
        //     // splitClasses.coursesFIN = parseInt(splitClasses.coursesFIN, 10) + 1
        //     // splitClasses.courseLeft = parseInt(splitClasses.courseLeft, 10) - 1
        //     // filteredStudents.forEach(student => {
        //     //     student.buyDetail = student.buyDetail.map(detail => {
        //     //       if (detail.classID === splitClasses.classID) {
        //     //         // 如果 classID 匹配目标 classID，则修改 courseLEFT 和 courseFIN 的值
        //     //         detail.coursesFIN = parseInt(detail.coursesFIN, 10) + 1
        //     //         detail.courseLeft = parseInt(detail.courseLeft, 10) - 1
        //     //       }
        //     //       return detail;
        //     //     });
        //     //   });
        console.log("預約了，但沒來上課")
        // console.log("splitClasses", splitClasses)
        // console.log("coursesFIN", splitClasses.coursesFIN)
        // console.log("courseLeft", splitClasses.courseLeft)
        console.log("filteredStudents", splitClasses)
      }
      // }
      // const content = JSON.parse(tableData)
      setTableData([...tableData]); //re-render with new data
      setCourseLeft(splitClasses.courseLeft)
      // console.log("test",cell.row.original.attandence)
    },
    [dispatch, tableData],
  );

  //   console.log("splitClasses",splitClasses)
  const handleDeleteRow = useCallback( //  儲存刪除
    (row) => {
      if (
        !confirm(`確定刪除此欄資料`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      // tableData.splice(row.index, 1);
      setTableData([...tableData]);
      const newTableData = tableData.filter((item, index) => index !== row.index);
      dispatch(updateTableData(newTableData));
    },
    [tableData],
  );

  // console.log("tableData",tableData)
  const columns = [ //表格有的資料
    {
      id: 'delete',
      header: '刪除',
      Cell:({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      size: 50,
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
      id: "attendanceStu",
      header: "上課學生",
      size: 150,
      enableEditing: false
    },
    {
      accessorKey: "reserveDate",
      header: "日期",
      size: 100,
    },
    {
      accessorKey: "reserveTime",
      header: "時間",
      size: 100,
    },
    {
      accessorKey: "attandence",
      header: "是否來上課",
      size: 100,
      enableSorting: false
    },
    {
      accessorKey: "cancel",
      header: "取消預約",
      // id:"cansole", 影響編輯
      //影響說明：雖然值一樣，但是如果用滑鼠再框格中點一下取消反白，或是點擊框框中的文字也會被視為修改資料，單單出席跟取消預約有問題
      size: 50,
      enableSorting: false,
    },
    {
      accessorKey: "note",
      header: "備註",
      size: 200,
      enableSorting: false
    }
  ];


  return (
    <div>
      {/* <p>剩餘堂數：{courseLeft}</p> */}
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
        // enableRowSelection
        // enableRowActions

        // getRowId={(row) => row.userId} //give each row a more useful id
        // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        // state={{ rowSelection }} //pass our managed row selection state to the table to use
        editingMode="cell"
        enableEditing
        // renderRowActions={({ row }) => (
        //   <Box sx={{ display: 'flex', gap: '1rem' }}>
        //     <Tooltip arrow placement="right" title="Delete">
        //       <IconButton color="error" onClick={() => handleDeleteRow(row)}>
        //         <Delete />
        //       </IconButton>
        //     </Tooltip>
        //   </Box>
        // )}
        muiTableBodyCellEditTextFieldProps={({ cell, row }) => ({
          //onBlur is more efficient, but could use onChange instead
          onBlur: (event) => {
            handleSaveCell(cell, event.target.value, splitClasses, row);
          },
        })}
        renderBottomToolbarCustomActions={() => (
          <Typography sx={{ p: '16px', fontWeight: "900" }} variant="body2">
            雙擊要修改的內容進行修改
          </Typography>
        )}
        localization={{
          header: {
            actions: '',
          }
        }}
      />
    </div>


  )
}

export default ClassDetailTable
