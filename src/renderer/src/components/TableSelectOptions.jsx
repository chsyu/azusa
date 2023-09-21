import { Link } from 'react-router-dom';


export const CheckOut = ( pageData, data) => { //設定查看按鈕要進入的頁面
    const linkTo = `/${pageData}/${data}`;
    return<>
       <Link to={linkTo} className='table-link-underline-none'>
            <button type="button" className="btn btn-golden">查看</button> 
        </Link>
    </>
};

export const splitData = ( element ) => {
    return element.join("、")
}

const CountMoney = ( {row, renderedCellValue} ) => {
    return <>{ row.original.salary * renderedCellValue}</>
}


export const selectOptions = [ //下拉選單篩選
{ text: 'PT', value: 'PT' },
{ text: '皮拉提斯', value: '皮拉提斯' },
{ text: '團課', value: '團課' },
{ text: '場地租借', value: '場地租借' },
{ text: '運動舒緩', value: '運動舒緩' }
];

export const columnsRevenue = [
    {
        accessorKey:"courseType",
        header:"項目名稱"
    },
    {
        accessorKey:"preCourseLeft",
        header:"上月未核銷堂數",
    },
    {
        accessorFn: (row) => `${row.salary*row.preCourseLeft} `,
        id:"lastMonthMoney",
        // accessorKey:"preCourseLeft",
        header:"上月未核銷金額",
        // Cell:CountMoney
    },
    {
        accessorKey:"courseLeft",
        header:"本月未核銷堂數",
        
    },
    {
        accessorFn: (row) => `${row.salary*row.courseLeft} `,
        id:"thisMonthMoney",
        // accessorKey:"courseLeft",
        header:"本月未核銷金額",       
        // Cell:CountMoney
    }
]

export const columnsMoney = [
    {
        accessorKey:"couch",
        header:"教練名稱",
        size:100
    },
    {
        accessorKey:"coursesFIN",
        header:"已核銷堂數",
        size:100
    },
    {
        accessorKey:"courseLeft",
        header:"未核銷堂數",
        size:100
    },
    {
        accessorFn: (row) => `${row.major.join("、")} `,

        id:"major",
        header:"課程種類",
        Cell: ({ renderedCellValue }) => (<span>{renderedCellValue}</span>),
        size:100,
        
    },
    {
        accessorKey:"coursesAll",
        header:"體驗課堂數",
        size:100
    }
]