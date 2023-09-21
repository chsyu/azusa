import Navbar from '../components/Navbar'
import RevenueSetTable from '../components/RevenueSetTable'
import { columnsRevenue, columnsMoney } from '../components/TableSelectOptions'
import newJson from '../json/new_class.json'
function Revenue({ classes }) {
  //new json new_class
  const nJson = newJson
  // 创建一个新的 Map 对象，用于存储教练与其课程类型的关系
  const coachCoursesMap = new Map()

  // 遍历 JSON 数据，将每个教练与其课程类型关联起来
  nJson.forEach((category) => {
    if (category.category === 'class') {
      category.classDetail.forEach((classData) => {
        const coachID = classData.coach[0].coachID
        const courseType = classData.courseType

        // 检查 Map 中是否已有该教练的记录
        if (coachCoursesMap.has(coachID)) {
          // 如果已有记录，将课程类型添加到数组中
          const currentCourses = coachCoursesMap.get(coachID)
          currentCourses.push(courseType)
          coachCoursesMap.set(coachID, currentCourses)
        } else {
          // 如果没有记录，创建新的记录并初始化课程类型数组
          coachCoursesMap.set(coachID, [courseType])
        }
      })
    }
  })
  // 将 Map 转换为数组
  const coachCoursesArray = [...coachCoursesMap]
  // coachCoursesArray 包含每位教练id对应的课程类型数组
  console.log(coachCoursesArray)


  const coachSalaryMap = new Map();
  // 遍历 JSON 数据，打印每个教练的 ID、课程类型和 coursesAll
  nJson.forEach((category) => {
    if (category.category === 'class') {
      category.classDetail.forEach((classData) => {
        const coachID = classData.coach[0].coachID
        const courseType = classData.courseType
        const coursesAll = classData.coursesAll

        // 打印教练 ID、课程类型和 coursesAll
        console.log(`教练 ID: ${coachID}, 课程类型: ${courseType}, coursesAll: ${coursesAll}`)

        // 查找对应教练的薪资信息
        const coachInfo = nJson.find(
          (item) =>
            item.category === 'coach' && item.coachDetail.some((coach) => coach.coachID === coachID)
        )

        if (coachInfo) {
          const ptSalary = coachInfo.coachDetail.find((coach) => coach.coachID === coachID).PtSalary
          const groupSalary = coachInfo.coachDetail.find(
            (coach) => coach.coachID === coachID
          ).GroupSalary
          const massageSalary = coachInfo.coachDetail.find(
            (coach) => coach.coachID === coachID
          ).MassageSalary
          const pilatesSalary = coachInfo.coachDetail.find(
            (coach) => coach.coachID === coachID
          ).PilatesSalary

          // 计算薪资乘以 coursesAll，并存储到 Map 中
          coachSalaryMap.set(coachID, {
            ptSalary: courseType === 'PT' ? ptSalary * coursesAll : 0,
  groupSalary: courseType === '團課' ? groupSalary * coursesAll : 0,
  massageSalary: courseType === '運動按摩' ? massageSalary * coursesAll : 0,
  pilatesSalary: courseType === '皮拉提斯' ? pilatesSalary * coursesAll : 0,
          })
        }
      })
    }
  })
  // 将 Map 转换为数组
const coachSalaryArray = [...coachSalaryMap];

// coachSalaryArray 包含每位教练的薪资信息
//console.log(coachSalaryArray);
// 遍历教练薪资 Map，打印每位教练的薪资
coachSalaryMap.forEach((salaries, coachID) => {
    console.log(`Coach ID: ${coachID}`);
    console.log(`PT Salary: ${salaries.ptSalary}`);
    console.log(`Group Salary: ${salaries.groupSalary}`);
    console.log(`Massage Salary: ${salaries.massageSalary}`);
    console.log(`Pilates Salary: ${salaries.pilatesSalary}`);
    console.log('-----------------------------');
  });

  //total salary個別教練 總薪水
  coachSalaryMap.forEach((salaries, coachID) => {
    const totalSalary =
      salaries.ptSalary +
      salaries.groupSalary +
      salaries.massageSalary +
      salaries.pilatesSalary;
    console.log(`Coach ID: ${coachID}, Total Salary: ${totalSalary}`);
  });

    //total salary所有教練加總 總薪水
    let totalSalarySum = 0;

    coachSalaryMap.forEach((salaries) => {
      const { ptSalary, groupSalary, massageSalary, pilatesSalary } = salaries;
      totalSalarySum +=
        ptSalary +
        groupSalary +
        massageSalary +
        pilatesSalary;
    });
    console.log(`所有教练的薪水总和: ${totalSalarySum}`);




//-------------------------------------------------------------------
  // 按 courseType 分类的数据 計算為未核銷金額
  const courseTypeLeftData = {};
  let totalLeftCourseCount = 0;
  // 遍历 JSON 数据并整理
  nJson.forEach(categoryItem => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach(classItem => {
        const courseType = classItem.courseType;
        const courseLeft = parseInt(classItem.courseLeft) || 0;
        let totalLeftSalary = 0;
        
        console.log("課程對應未核銷堂數",courseType,courseLeft);

        // 查找该班级的 coach 数据
        if (classItem.coach && classItem.coach.length > 0) {
          const coachID = classItem.coach[0].coachID;
            //console.log("課程對應教練ID",coachID);
          // 查找对应的 coach 数据
          const coachData = nJson.find(item => item.category === 'coach' && item.coachDetail.find(coach => coach.coachID === coachID));
          
          if (coachData) {
            let coachSalary = 0;
            switch (courseType) {
              case 'PT':
                coachSalary = coachData.coachDetail[0].PtSalary || 0;
                break;
              case '團課':
                coachSalary = coachData.coachDetail[0].GroupSalary || 0;
                break;
              case '運動按摩':
                coachSalary = coachData.coachDetail[0].MassageSalary || 0;
                break;
              case '皮拉提斯':
                coachSalary = coachData.coachDetail[0].PilatesSalary || 0;
                break;
              default:
                break;
            }
            
            // 计算 totalLeftSalary
            totalLeftSalary = courseLeft * coachSalary;
          //count totalLeftCourseCount
            totalLeftCourseCount += courseLeft;
          }
        }
  
        if (!courseTypeLeftData[courseType]) {
            courseTypeLeftData[courseType] = {
            totalLeftSalary: 0,
          };
        }
  
        courseTypeLeftData[courseType].totalLeftSalary += totalLeftSalary;
      });
    }
  });
  const totalSumLeft = Object.values(courseTypeLeftData).reduce((sum, typeData) => sum + typeData.totalLeftSalary, 0);
  console.log("AAAtotalSumLeft",totalSumLeft);
  console.log("AAAtotalLeftCourseCount",totalLeftCourseCount);
  // 输出整理后的数据
  console.log("AAAleftcourseTotal",courseTypeLeftData);
    
  //計算為已核銷金額
  // 创建一个对象来存储按 courseType 分类的数据 計算為未核銷金額
  const courseTypeFINData = {};
  let totalFINCourseCount = 0;
  // 遍历 JSON 数据并整理
  nJson.forEach(categoryItem => {
    if (categoryItem.category === 'class' && categoryItem.classDetail) {
      categoryItem.classDetail.forEach(classItem => {
        const courseType = classItem.courseType;
        const coursesFIN = parseInt(classItem.coursesFIN) || 0;
        let totalFINSalary = 0;
        //console.log("課程對應核銷堂數",courseType,coursesFIN);

        // 查找该班级的 coach 数据
        if (classItem.coach && classItem.coach.length > 0) {
          const coachID = classItem.coach[0].coachID;
            //console.log("課程對應教練ID",coachID);
          // 查找对应的 coach 数据
          const coachData = nJson.find(item => item.category === 'coach' && item.coachDetail.find(coach => coach.coachID === coachID));
          
          if (coachData) {
            let coachSalary = 0;
            switch (courseType) {
              case 'PT':
                coachSalary = coachData.coachDetail[0].PtSalary || 0;
                break;
              case '團課':
                coachSalary = coachData.coachDetail[0].GroupSalary || 0;
                break;
              case '運動按摩':
                coachSalary = coachData.coachDetail[0].MassageSalary || 0;
                break;
              case '皮拉提斯':
                coachSalary = coachData.coachDetail[0].PilatesSalary || 0;
                break;
              default:
                break;
            }
            
            // 计算 totalSalary
            totalFINSalary = coursesFIN * coachSalary;
            totalFINCourseCount += coursesFIN;
          }
        }
  
        if (!courseTypeFINData[courseType]) {
            courseTypeFINData[courseType] = {
            totalFINSalary: 0,
          };
        }
  
        courseTypeFINData[courseType].totalFINSalary += totalFINSalary;
      });
    }
  });
  const totalSumFIN = Object.values(courseTypeFINData).reduce((sum, typeData) => sum + typeData.totalFINSalary, 0);
  console.log("AAAtotalSumFIN",totalSumFIN);
    console.log("AAAtotalFINCourseCount",totalFINCourseCount);
  // 输出整理后的数据
  console.log("AAAfincoursetotal",courseTypeFINData);





//下方表格使用---------------------------------------------------
    const coachInfo = [];

// 遍历包含 coach 信息的数组
nJson.forEach(categoryItem => {
  if (categoryItem.category === 'coach' && categoryItem.coachDetail) {
    categoryItem.coachDetail.forEach(coachItem => {
      const coachData = {
        coachID: coachItem.coachID,
        coachName: coachItem.coachName,
        major: coachItem.major,
        teachClass: []
      };

      // 遍历 teachClass 数组并提取 classID
      if (coachItem.teachClass) {
        coachItem.teachClass.forEach(teachClassItem => {
          coachData.teachClass.push(teachClassItem.classID);
        });
      }

      // 将提取的教练信息添加到结果数组中
      coachInfo.push(coachData);
    });
  }
});
// 输出结果
console.log("AAAcoachInfo",coachInfo);

//課程核銷相關
const classInfo = [];
// 遍历包含 class 信息的数组
nJson.forEach(categoryItem => {
  if (categoryItem.category === 'class' && categoryItem.classDetail) {
    categoryItem.classDetail.forEach(classItem => {
      const classData = {
        classID: classItem.classID,
        coursesAll: classItem.coursesAll,
        coursesFIN: classItem.coursesFIN,
        courseLeft: classItem.courseLeft
      };

      // 将提取的班级信息添加到结果数组中
      classInfo.push(classData);
    });
  }
});
// 输出结果
console.log("AAAclassInfo",classInfo);

// const mergeInfo = coachInfo.reduce((result,itemB) => {
//     itemB.teachClass.forEach((classIDs) => {
//         const matchingClass = classIDs.map((classID) => 
//         classInfo.find((itemC) => itemC.classID === classID)
//         );
//         result.push({ ...itemB, ...matchingClass });
//     });
//     return result;
// }, []);
// console.log("AAAmergeInfo",mergeInfo);
const mergeInfo = coachInfo.reduce((result, itemB) => {
    itemB.teachClass.forEach((classIDs) => {
      const matchingClassID = classIDs[0]; // 假设每个班级只有一项
  
      // 查找匹配的班级信息
      const matchingClass = classInfo.find((itemC) => itemC.classID === matchingClassID);
  
      if (matchingClass) {
        result.push({ ...itemB, ...matchingClass });
      }
    });
    return result;
  }, []);
  console.log("AAAmergeInfo", mergeInfo);

//計算體驗課堂數exCourse---------------------------------------------------
const coachExCourseCounts = {};

// 遍历 JSON 数据
nJson.forEach(categoryItem => {
  if (categoryItem.category === 'class' && categoryItem.classDetail) {
    categoryItem.classDetail.forEach(classItem => {
      const coachName = classItem.coach[0].coachName;
      const exCourse = classItem.exCourse;

      if (!coachExCourseCounts[coachName]) {
        coachExCourseCounts[coachName] = 0;
      }

      if (exCourse === '是') {
        coachExCourseCounts[coachName]++;
      }
    });
  }
});

// 输出每个教练的 exCourse 总数
console.log("coachExCourseCount",coachExCourseCounts);


//下方表格使用---------------------------------------------------END


//old---------------------------------------------------
  //計算營業額
  let sum = 0
  let finCourse = 0
  let finMoney = 0
  let leftCourse = 0
  let leftMoney = 0

  for (let i = 0; i < classes.length; i++) {
    if (i == 0) {
      sum = classes[i].salary * classes[i].coursesAll
      finCourse = classes[i].coursesFIN * 1
      finMoney = classes[i].salary * classes[i].coursesFIN

      leftCourse = classes[i].courseLeft * 1
      leftMoney = classes[i].courseLeft * classes[i].salary
    } else {
      sum += classes[i].salary * classes[i].coursesAll
      finCourse += classes[i].coursesFIN * 1
      finMoney += classes[i].salary * classes[i].coursesFIN

      leftCourse += classes[i].courseLeft * 1
      leftMoney += classes[i].courseLeft * classes[i].salary
      // sum +=  each
      // finCoures += course
    }
  }
  const products = [
    {
      id: '0',
      courseType: 'PT',
      courseLeft: '15',
      preCourseLeft: '16',
      salary: '650'
    },
    {
      id: '1',
      courseType: '皮拉提斯',
      courseLeft: '6',
      preCourseLeft: '6',
      salary: '650'
    },
    {
      id: '2',
      courseType: '團課',
      courseLeft: '7',
      preCourseLeft: '7',
      salary: '650'
    },
    {
      id: '3',
      courseType: '場地租借',
      courseLeft: '3',
      preCourseLeft: '6',
      salary: '650'
    },
    {
      id: '4',
      courseType: '運動舒緩',
      courseLeft: '0',
      preCourseLeft: '0',
      salary: '650'
    }
  ]
  //---------------------------------------------------old above

  return (
    <div className="container-fluid" style={{ backgroundColor: 'white' }}>
      <div className="row form_class row-no-gutters">
        <div className="nav col-2">
          <Navbar />
        </div>
        <div className="col-10 container margin-left-right">
          <div className="table-container">
            <h1 className="title">營業額</h1>
            <div>
              <div>總收入/月</div>
              <h1 className="money-title mt-2 title">$ {totalSalarySum}</h1>
            </div>
            {/* <RevenueSetTable classes={classes} columns={columnsRevenue}/> */}
            <RevenueSetTable classes={products} columns={columnsRevenue} />
            <h1 className="title  mt-4">核銷</h1>
            <div className="row">
              <div className="col-6">
                <div>已核銷</div>
                <h1 className="money-title mt-2 title">
                  $ {totalSumFIN} / {totalFINCourseCount}堂
                </h1>
              </div>
              <div className="col-6">
                <div>未核銷</div>
                <h1 className="money-title mt-2 title">
                  $ {totalSumLeft} / {totalLeftCourseCount}堂
                </h1>
              </div>
            </div>
            <RevenueSetTable classes={classes} columns={columnsMoney} />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Revenue
