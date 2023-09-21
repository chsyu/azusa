import React from "react";
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';

function RevenueSetTable({classes, columns}) {
    const downloadExcel=()=>{
        const newData=classes.map(row=>{
          delete row.invoiceNum
          return row
        })
        console.log(newData)
        const workSheet=XLSX.utils.json_to_sheet(newData)
        const workBook=XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workBook,workSheet,"Data")
        //Buffer
        let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
        //Binary string
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
        //Download
        XLSX.writeFile(workBook,"Data.xlsx")  
        
      }
      
  return (
    
    <MaterialReactTable 
        columns={columns}
        data={classes} 
        initialState={{ showGlobalFilter: true }} //show filters by default
        enableColumnActions={false} //no need for column actions if none of them are enabled
        enableDensityToggle={false} //density does not work with memoized table body
        enableFullScreenToggle={false}
        enableHiding={false} //column hiding does not work with memoized table body
        enableStickyHeader
        // renderTopToolbarCustomActions={() => (
        //     <Box
        //         sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
        //     >
        //         <button
        //             className="btn btn-golden"
        //             //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
        //             onClick={downloadExcel}
        //         >
        //             <FileDownloadIcon/>
        //         </button>
        //     </Box>

        // )}
                                
    />
                
  )
}

export default RevenueSetTable