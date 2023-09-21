import { Link } from 'react-router-dom'
import { MaterialReactTable } from 'material-react-table'
import React, { useEffect, useCallback, useState } from 'react';
import newJson from '../json/new_class.json'
import { selectOptions, CheckOut, splitData } from './TableSelectOptions'
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

function CoachDetailTable({ classes }) {
  //optionally, you can manage the row selection state yourself
    // 獲取教練所教授的課程的 classID
  const teachClassIDs = classes.teachClass.map(students => students.classID);

  //使用 classID 在 classDetail 中找到相對應的課程資料
  const classDetailData = newJson.find(item => item.category === "class").classDetail.filter(classData => teachClassIDs.includes(classData.classID));
  console.log(classDetailData);

  // 將預約資料放進去
  let reserveData = []
  classDetailData.forEach(item => {
      for (let i = 0; i < item.reserveDetail.length; i++) {
        reserveData.push(item.reserveDetail[i])
      }
  })
  console.log('aaabclasses:', reserveData)

  const [rowSelection, setRowSelection] = useState({})

  //console.log('aaaclasses:', detailData)
  useEffect(() => {
    //do something when the row selection changes...
    //console.info({ rowSelection });
  }, [rowSelection])

  const [tableData, setTableData] = useState(() => reserveData);
  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`確定刪除此欄資料`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
  );

  const columns = [
    //表格有的資料
    {
      accessorFn: (row) => `${row.student[0].courseType} `,
      id:"courseType",
      header: '課程種類',
      size: 50,
      filterVariant: 'select',
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
      id:"student",
      header: '學員',
      size: 100,
      filterVariant: 'select',
    },
    {
      accessorKey: 'reserveDate',
      header: '日期',
      size: 100
    },
    {
      accessorKey: 'reserveTime',
      header: '時間',
      size: 100,
      enableSorting: false
    },
    {
      accessorKey: 'attandence',
      header: '是否來上課',
      size: 50,
      enableSorting: false
    },
    {
      accessorKey: 'cancel',
      header: '取消預約',
      size: 50,
      enableSorting: false
    },
    {
      accessorKey: 'note',
      header: '備註',
      size: 150,
      enableSorting: false
    }
  ]

  return (
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
      // getRowId={(row) => row.userId} //give each row a more useful id
      // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      // state={{ rowSelection }} //pass our managed row selection state to the table to use
      enableRowActions
      renderRowActions={({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
      )}
    />
  )
}

export default CoachDetailTable
