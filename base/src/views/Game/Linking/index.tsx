//  @ts-nocheck
import React from 'react';
import $ from './js/jquery';
import avocado from './pic/avocado.png';
import biscuits from './pic/biscuits.png';
import cake from './pic/cake.png';
import doughnut from './pic/doughnut.png';
import eggYolkPuff from './pic/egg-yolk_puff.png';
import mochi from './pic/mochi.png';
import pizza from './pic/pizza.png';
import pudding from './pic/pudding.png';
import strawberry from './pic/strawberry.png';
import white from './pic/white.png';

import acrossLine from './svg/acrossLine.svg'
import downToLeftLine from './svg/downToLeftLine.svg'
import downToRightLine from './svg/downToRightLine.svg'
import upToLeftLine from './svg/upToLeftLine.svg'
import upToRightLine from './svg/upToRightLine.svg'
import verticalLine from './svg/verticalLine.svg'

import './index.less';

export default () => {

  // 所有图片信息
  const pics = new Array(
    avocado,
    biscuits,
    cake,
    doughnut,
    eggYolkPuff,
    mochi,
    pizza,
    pudding,
    strawberry
  );

  // 类用于存储状态等
  function Box() {
    //备份this
    let self = this;

    self.id = ""; //对应box的id
    self.picName = ""; //对应box的图片名
    self.display = true; //对应box是否展示

    // 坐标
    self.x = 0;
    self.y = 0;

    // setter与getter方法
    self.getId = function () {
      return self.id;
    };
    self.setId = function (id) {
      self.id = id;
    };
    self.getPicName = function () {
      return self.picName;
    };
    self.setPicName = function (picName) {
      self.picName = picName;
    };
    self.getDisplay = function () {
      return self.display;
    };
    self.setDisplay = function (display) {
      self.display = display;
    };
    self.getX = function () {
      return self.x;
    };
    self.setX = function (x) {
      self.x = x;
    };
    self.getY = function () {
      return self.y;
    };
    self.setY = function (y) {
      self.y = y;
    };
  }

  // 对应的大小规格，即总块数与边长的对应关系
  // sideLength:边长,area:面积,picNum:图片数
  const specifications = new Array(
    { sideLength: 4, area: 16, picNum: 3 },
    { sideLength: 6, area: 36, picNum: 6 },
    { sideLength: 8, area: 64, picNum: 9 }
  );

  // 块数
  var sumDivNum = 64;

  //每一个box对应一个对象
  let boxs = new Array(sumDivNum);

  let currentSideLength = Math.sqrt(sumDivNum);
  let idNum = 0;

  for (let i = 0; i < currentSideLength; i++) {
    for (let j = 0; j < currentSideLength; j++) {
      boxs[idNum] = new Box();
      boxs[idNum].setId(idNum);

      boxs[idNum].setX(j);
      boxs[idNum].setY(i);

      idNum++;
    }
  }

  // 当前选择第几块
  let selectNum = 0;
  let selectDivId = {
    id1: 0,
    id2: 0
  };

  $(document).ready(function () {
    //初始化
    init();

    // 为各个box设置点击事件
    setClickEvent();
  });

  // 提示算法
  function hint() {
    // 遍历所有box，检查是否有可达的
    flag: for (let i = 0; i < sumDivNum; i++) {
      // 该box还未被消除的话，检测有可达的否
      if (boxs[i].getDisplay()) {
        for (let j = 0; j < sumDivNum; j++) {
          // 两个不是同一个，都展示，可以被消除，同一图片
          if (
            boxs[j].getDisplay() &&
            isRemoved(i, j) != -1 &&
            boxs[i].getPicName() === boxs[j].getPicName() &&
            i != j
          ) {
            $(`#${i}`).addClass("border");
            $(`#${j}`).addClass("border");

            setTimeout(function () {
              $(`#${i}`).removeClass("border");
              $(`#${j}`).removeClass("border");
            }, 500);

            break flag;
          }
        }
      }
    }
  }

  // 随机打乱算法
  function randomReflash() {
    for (let i = 0; i < sumDivNum; i++) {
      if (boxs[i].getDisplay()) {
        // 找一个未在展示的box进行交换
        // let index = findUnShowBox();

        // boxs[index].setPicName(boxs[i].getPicName());
        // boxs[index].setDisplay(true);
        // $(`#${index}`).css("background-image",`url('../../pic/${boxs[index].getPicName()}.png')`);

        // boxs[i].setDisplay(false);
        // $(`#${i}`).css("background-image",`url('../../pic/white.png')`);

        // 随机交换
        let index = randomNum(0, sumDivNum - 1);

        let picName = boxs[i].getPicName();

        boxs[i].setPicName(boxs[index].getPicName());
        boxs[i].setDisplay(boxs[index].getDisplay());
        if (boxs[i].getDisplay()) {
          // $(`#${i}`).css(
          //   "background-image",
          //   `url('../../pic/${boxs[index].getPicName()}.png')`
          // );
          var img = $('<img />', { 
            src: boxs[index].getPicName(),
            alt: '',
            width:'50px',draggable: false
          });
          $(`#${i}`).empty();
          $(`#${i}`).append(img)
        } else {
          // $(`#${i}`).css("background-image", `url('../../pic/white.png')`);
          var img = $('<img />', { 
            src: white,
            alt: '',
            width:'50px',draggable: false
          });
          $(`#${i}`).empty();
          $(`#${i}`).append(img)
        }

        boxs[index].setPicName(picName);
        boxs[index].setDisplay(true);

        // $(`#${index}`).css(
        //   "background-image",
        //   `url('../../pic/${boxs[index].getPicName()}.png')`
        // );
        var img = $('<img />', { 
          src: boxs[index].getPicName(),
          alt: '',
          width:'50px',draggable: false
        });
        $(`#${index}`).empty();
        $(`#${index}`).append(img)
      }
    }
  }

  // 随机寻找一个处于未展示状态的box的index
  function findUnShowBox() {
    // 随机寻找一百次
    let flag = 0;
    while (flag < 100) {
      let random = randomNum(0, sumDivNum - 1);
      if (!boxs[random].getDisplay()) {
        return random;
      }
      flag++;
    }

    // 一百次没有找到就按顺序找一个
    for (let i = 0; i < sumDivNum; i++) {
      if (!boxs[i].getDisplay()) {
        return i;
      }
    }
  }

  // 为每一个box声明点击事件
  function setClickEvent() {
    //为每一个box设置点击事件
    for (let i = 0; i < sumDivNum; i++) {
      $("#" + i).click(function () {
        // 当自己已经被隐藏时点击不生效
        if (!boxs[i].getDisplay()) {
          return;
        }

        switch (selectNum) {
          // 当这是选择的第一块时
          case 0:
            {
              selectNum = 1;
              selectDivId.id1 = i;
              $("#" + i).addClass("border");
            }
            break;
          // 当这是选择的第二块时
          case 1:
            {
              // 排除点击自己
              if (i === selectDivId.id1) {
              } else {
                selectNum = 0;
                selectDivId.id2 = i;
                $("#" + i).addClass("border");

                // 判断是否能被消除
                let resultNum = isRemoved(selectDivId.id1, selectDivId.id2);
                if (resultNum != -1) {
                  boxs[selectDivId.id1].setDisplay(false);
                  boxs[selectDivId.id2].setDisplay(false);

                  // $("#"+selectDivId.id1).css("background-image","url('../../pic/white.png')");
                  // $("#"+selectDivId.id2).css("background-image","url('../../pic/white.png')");
                  let pathArray = getPathArray(
                    resultNum,
                    selectDivId.id1,
                    selectDivId.id2
                  );

                  //console.log("pathArray", pathArray);

                  showPath(pathArray);

                  let temId1 = selectDivId.id1;
                  let temId2 = selectDivId.id2;

                  // 让人看两秒再触发消除效果
                  setTimeout(function () {
                    showSound("./sound/removeSuccess.mp3");

                    $("#" + temId1).addClass("clearUp");
                    $("#" + temId2).addClass("clearUp");

                    $("#" + temId1).removeClass("border");
                    $("#" + temId2).removeClass("border");

                    hidePath(pathArray);

                    // 直接把背景换为白色
                    setTimeout(function () {
                      // $("#" + temId1).css(
                      //   "background-image",
                      //   "url('../../pic/white.png')"
                      // );
                      var img = $('<img />', { 
                        src: white,
                        alt: '',
                        width:'50px',draggable: false
                      });
                      $("#" + temId1).empty();
                      $("#" + temId1).append(img)
                      // $("#" + temId2).css(
                      //   "background-image",
                      //   "url('../../pic/white.png')"
                      // );
                      var img = $('<img />', { 
                        src: white,
                        alt: '',
                        width:'50px',draggable: false
                      });
                      $("#" + temId2).empty();
                      $("#" + temId2).append(img)

                      $("#" + temId1).removeClass("clearUp");
                      $("#" + temId2).removeClass("clearUp");

                      // 检测是否消除完所有方块
                      if (isRemoveAll()) {
                        showSound("./sound/pulinpulin.mp3");
                        alert("恭喜你已消除完所有方块了！");
                      } else {
                        // 检测是否死锁
                        if (!isNotDeadLock()) {
                          // 随机刷新界面
                          while (!isNotDeadLock()) {
                            randomReflash();
                          }
                          alert("已没有可以连接的方块了！");
                        }
                      }
                    }, 200);
                  }, 200);
                } else {
                  setTimeout(function () {
                    showSound("./sound/removeFail.mp3");

                    $("#" + selectDivId.id1).removeClass("border");
                    $("#" + selectDivId.id2).removeClass("border");
                  }, 200);
                }
              }
            }
            break;
        }
      });
    }
  }

  // 检测是否未陷入死锁状态
  function isNotDeadLock() {
    // 遍历所有box，检查是否有可达的
    for (let i = 0; i < sumDivNum; i++) {
      // 该box还未被消除的话，检测有可达的否
      if (boxs[i].getDisplay()) {
        for (let j = 0; j < sumDivNum; j++) {
          // 两个不是同一个，都展示，可以被消除，同一图片
          if (
            boxs[j].getDisplay() &&
            isRemoved(i, j) != -1 &&
            boxs[i].getPicName() === boxs[j].getPicName() &&
            i != j
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // 检测是否消除完所有方块了
  function isRemoveAll() {
    // 遍历所有box，检查是否有还未消除的
    for (let i = 0; i < sumDivNum; i++) {
      // 该box还未被消除的话，检测有可达的否
      if (boxs[i].getDisplay()) {
        return false;
      }
    }
    return true;
  }

  // 获取路径
  function getPathArray(resultNum, id1, id2) {
    let pathArray = new Array();

    // 识别不同的情况
    switch (resultNum) {
      // 直连
      case 0:
        {
          let temPathArray = getPathBetweenTwoPoint(
            { x: boxs[id1].getX(), y: boxs[id1].getY() },
            { x: boxs[id2].getX(), y: boxs[id2].getY() }
          );

          pathArray.push({ x: boxs[id1].getX(), y: boxs[id1].getY() });
          for (let i = 0; i < temPathArray.length; i++) {
            pathArray.push(temPathArray[i]);
          }
          pathArray.push({ x: boxs[id2].getX(), y: boxs[id2].getY() });

          return pathArray;
        }
        break;
      // 拐一折弯
      case 1:
        {
          if (
            sameOneCoordIsReach(
              id1,
              getIndexByCoord(boxs[id1].getX(), boxs[id2].getY())
            ) &&
            sameOneCoordIsReach(
              id2,
              getIndexByCoord(boxs[id1].getX(), boxs[id2].getY())
            ) &&
            !boxs[
              getIndexByCoord(boxs[id1].getX(), boxs[id2].getY())
            ].getDisplay()
          ) {
            let temPathArray1 = getPathBetweenTwoPoint(
              { x: boxs[id1].getX(), y: boxs[id1].getY() },
              { x: boxs[id1].getX(), y: boxs[id2].getY() }
            );
            let temPathArray2 = getPathBetweenTwoPoint(
              { x: boxs[id1].getX(), y: boxs[id2].getY() },
              { x: boxs[id2].getX(), y: boxs[id2].getY() }
            );

            pathArray.push({ x: boxs[id1].getX(), y: boxs[id1].getY() });
            for (let i = 0; i < temPathArray1.length; i++) {
              pathArray.push(temPathArray1[i]);
            }
            pathArray.push({ x: boxs[id1].getX(), y: boxs[id2].getY() });
            for (let i = 0; i < temPathArray2.length; i++) {
              pathArray.push(temPathArray2[i]);
            }
            pathArray.push({ x: boxs[id2].getX(), y: boxs[id2].getY() });

            return pathArray;
          }
          if (
            sameOneCoordIsReach(
              id1,
              getIndexByCoord(boxs[id2].getX(), boxs[id1].getY())
            ) &&
            sameOneCoordIsReach(
              id2,
              getIndexByCoord(boxs[id2].getX(), boxs[id1].getY())
            ) &&
            !boxs[
              getIndexByCoord(boxs[id2].getX(), boxs[id1].getY())
            ].getDisplay()
          ) {
            let temPathArray1 = getPathBetweenTwoPoint(
              { x: boxs[id1].getX(), y: boxs[id1].getY() },
              { x: boxs[id2].getX(), y: boxs[id1].getY() }
            );
            let temPathArray2 = getPathBetweenTwoPoint(
              { x: boxs[id2].getX(), y: boxs[id1].getY() },
              { x: boxs[id2].getX(), y: boxs[id2].getY() }
            );

            pathArray.push({ x: boxs[id1].getX(), y: boxs[id1].getY() });
            for (let i = 0; i < temPathArray1.length; i++) {
              pathArray.push(temPathArray1[i]);
            }
            pathArray.push({ x: boxs[id2].getX(), y: boxs[id1].getY() });
            for (let i = 0; i < temPathArray2.length; i++) {
              pathArray.push(temPathArray2[i]);
            }
            pathArray.push({ x: boxs[id2].getX(), y: boxs[id2].getY() });

            return pathArray;
          }
        }
        break;
      // 拐两折弯
      case 2:
        {
          // 整理两个box上下左右的可直达的点的坐标
          let coords1 = getAllReachCoordByBox(id1);
          let coords2 = getAllReachCoordByBox(id2);

          let point1;
          let point2;

          anc: for (let i = 0; i < coords1.length; i++) {
            for (let j = 0; j < coords2.length; j++) {
              if (
                coords1[i].x === coords2[j].x ||
                coords1[i].y === coords2[j].y
              ) {
                if (sameOneCoordIsReachByCoord(coords1[i], coords2[j])) {
                  point1 = coords1[i];
                  point2 = coords2[j];
                  break anc;
                }
              }
            }
          }

          let temPathArray1 = getPathBetweenTwoPoint(
            { x: boxs[id1].getX(), y: boxs[id1].getY() },
            { x: point1.x, y: point1.y }
          );
          let temPathArray2 = getPathBetweenTwoPoint(
            { x: point1.x, y: point1.y },
            { x: point2.x, y: point2.y }
          );
          let temPathArray3 = getPathBetweenTwoPoint(
            { x: point2.x, y: point2.y },
            { x: boxs[id2].getX(), y: boxs[id2].getY() }
          );

          pathArray.push({ x: boxs[id1].getX(), y: boxs[id1].getY() });
          for (let i = 0; i < temPathArray1.length; i++) {
            pathArray.push(temPathArray1[i]);
          }
          pathArray.push({ x: point1.x, y: point1.y });
          for (let i = 0; i < temPathArray2.length; i++) {
            pathArray.push(temPathArray2[i]);
          }
          pathArray.push({ x: point2.x, y: point2.y });
          for (let i = 0; i < temPathArray3.length; i++) {
            pathArray.push(temPathArray3[i]);
          }
          pathArray.push({ x: boxs[id2].getX(), y: boxs[id2].getY() });

          return pathArray;
        }
        break;
    }
    return pathArray;
  }

  // 封装两点间的路径 一定从obj1到obj2
  function getPathBetweenTwoPoint(obj1, obj2) {
    let pathArray = new Array();

    // x等还是y等
    // x等
    if (obj1.x === obj2.x) {
      if (obj1.y < obj2.y) {
        for (let i = obj1.y + 1; i < obj2.y; i++) {
          pathArray.push({ x: obj1.x, y: i });
        }
        return pathArray;
      } else {
        for (let i = obj2.y + 1; i < obj1.y; i++) {
          pathArray.push({ x: obj1.x, y: i });
        }
        return pathArray;
      }
    }
    // y等
    else {
      if (obj1.x < obj2.x) {
        for (let i = obj1.x + 1; i < obj2.x; i++) {
          pathArray.push({ x: i, y: obj1.y });
        }
        return pathArray;
      } else {
        for (let i = obj2.x + 1; i < obj1.x; i++) {
          pathArray.push({ x: i, y: obj1.y });
        }
        return pathArray;
      }
    }
  }

  // 展示路径
  function showPath(pathArray) {
    // switch(resultNum){
    //     // 直达
    //     case 0:{
    //         // x等，说明竖着拉线
    //         if(pathArray[0].x === pathArray[pathArray.length-1].x){
    //             for(let i=1; i<pathArray.length-1; i++){
    //                 // if(pathArray[i].x<0 || pathArray[i].x === currentSideLength || pathArray[i].y < 0 || pathArray[i].y === currentSideLength){
    //                 //     $(`#${pathArray[i].x}${pathArray[i].y}`).css("background-color","red");
    //                 // }
    //                 // else{
    //                 //     $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).css("background-color","red");
    //                 // }
    //                 $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).css("background-image","url('./svg/verticalLine.svg')");
    //             }
    //         }
    //         // 横着拉线
    //         else{
    //             for(let i=1; i<pathArray.length-1; i++){
    //                 $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).css("background-image","url('./svg/acrossLine.svg')");
    //             }
    //         }
    //     }
    //     break;
    //     // 拐弯 一弯还是两弯是一样的
    //     case 1:{}
    //     case 2:{

    //     }
    //     break;
    // }

    for (let i = 1; i < pathArray.length - 1; i++) {
      // 判断用的svg名称
      let svgName = "";
      // 竖直
      if (
        pathArray[i].x === pathArray[i - 1].x &&
        pathArray[i].x === pathArray[i + 1].x
      ) {
        svgName = verticalLine;
      }
      // 横着
      else if (
        pathArray[i].y === pathArray[i - 1].y &&
        pathArray[i].y === pathArray[i + 1].y
      ) {
        svgName = acrossLine;
      }
      // 上到右  || 右到上
      else if (
        (pathArray[i].x === pathArray[i - 1].x &&
          pathArray[i].y > pathArray[i - 1].y &&
          pathArray[i].y === pathArray[i + 1].y &&
          pathArray[i].x < pathArray[i + 1].x) ||
        (pathArray[i].x === pathArray[i + 1].x &&
          pathArray[i].y > pathArray[i + 1].y &&
          pathArray[i].y === pathArray[i - 1].y &&
          pathArray[i].x < pathArray[i - 1].x)
      ) {
        svgName = upToRightLine;
      }
      // 上到左  || 左到上
      else if (
        (pathArray[i].x === pathArray[i - 1].x &&
          pathArray[i].y > pathArray[i - 1].y &&
          pathArray[i].y === pathArray[i + 1].y &&
          pathArray[i].x > pathArray[i + 1].x) ||
        (pathArray[i].x === pathArray[i + 1].x &&
          pathArray[i].y > pathArray[i + 1].y &&
          pathArray[i].y === pathArray[i - 1].y &&
          pathArray[i].x > pathArray[i - 1].x)
      ) {
        svgName = upToLeftLine;
      }
      // 下到右 || 右到下
      else if (
        (pathArray[i].x === pathArray[i - 1].x &&
          pathArray[i].y < pathArray[i - 1].y &&
          pathArray[i].y === pathArray[i + 1].y &&
          pathArray[i].x < pathArray[i + 1].x) ||
        (pathArray[i].x === pathArray[i + 1].x &&
          pathArray[i].y < pathArray[i + 1].y &&
          pathArray[i].y === pathArray[i - 1].y &&
          pathArray[i].x < pathArray[i - 1].x)
      ) {
        svgName = downToRightLine;
      }
      // 下到左 || 左到下
      else if (
        (pathArray[i].x === pathArray[i - 1].x &&
          pathArray[i].y < pathArray[i - 1].y &&
          pathArray[i].y === pathArray[i + 1].y &&
          pathArray[i].x > pathArray[i + 1].x) ||
        (pathArray[i].x === pathArray[i + 1].x &&
          pathArray[i].y < pathArray[i + 1].y &&
          pathArray[i].y === pathArray[i - 1].y &&
          pathArray[i].x > pathArray[i - 1].x)
      ) {
        svgName = downToLeftLine;
      }

      // 判断点坐标是否越界以取得节点
      if (
        pathArray[i].x < 0 ||
        pathArray[i].x === currentSideLength ||
        pathArray[i].y < 0 ||
        pathArray[i].y === currentSideLength
      ) {
        // $(`#out${pathArray[i].x}${pathArray[i].y}`).css(
        //   "background-image",
        //   `url('./svg/${svgName}.svg')`
        // );
        var img = $('<img />', { 
          src: svgName,
          alt: '',
          width:'50px',draggable: false
        });
        $(`#out${pathArray[i].x}${pathArray[i].y}`).empty();
        $(`#out${pathArray[i].x}${pathArray[i].y}`).append(img)
      } else {
        // $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).css(
        //   "background-image",
        //   `url('./svg/${svgName}.svg')`
        // );
        var img = $('<img />', { 
          src: svgName,
          alt: '',
          width:'50px',draggable: false
        });
        $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).empty();
        $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).append(img)
      }
    }
  }

  // 隐藏路线
  function hidePath(pathArray) {
    for (let i = 1; i < pathArray.length - 1; i++) {
      // 判断点坐标是否越界以取得节点
      if (
        pathArray[i].x < 0 ||
        pathArray[i].x === currentSideLength ||
        pathArray[i].y < 0 ||
        pathArray[i].y === currentSideLength
      ) {
        // $(`#out${pathArray[i].x}${pathArray[i].y}`).css(
        //   "background-image",
        //   `url('../../pic/white.png')`
        // );
        var img = $('<img />', { 
          src: white,
          alt: '',
          width:'50px',draggable: false
        });
        $(`#out${pathArray[i].x}${pathArray[i].y}`).empty();
        $(`#out${pathArray[i].x}${pathArray[i].y}`).append(img)
      } else {
        // $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).css(
        //   "background-image",
        //   `url('../../pic/white.png')`
        // );
        var img = $('<img />', { 
          src: white,
          alt: '',
          width:'50px',draggable: false
        });
        $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).empty();
        $(`#${getIndexByCoord(pathArray[i].x, pathArray[i].y)}`).append(img)
      }
    }
  }

  //匹配算法
  function isRemoved(index1, index2) {
    // 看能否直连
    if (sameOneCoordIsReach(index1, index2)) {
      if (boxs[index1].getPicName() === boxs[index2].getPicName()) {
        return 0;
      }
    }

    // 一折能否可达
    if (
      sameOneCoordIsReach(
        index1,
        getIndexByCoord(boxs[index1].getX(), boxs[index2].getY())
      ) &&
      sameOneCoordIsReach(
        index2,
        getIndexByCoord(boxs[index1].getX(), boxs[index2].getY())
      ) &&
      !boxs[
        getIndexByCoord(boxs[index1].getX(), boxs[index2].getY())
      ].getDisplay()
    ) {
      if (boxs[index1].getPicName() === boxs[index2].getPicName()) {
        return 1;
      }
    }
    if (
      sameOneCoordIsReach(
        index1,
        getIndexByCoord(boxs[index2].getX(), boxs[index1].getY())
      ) &&
      sameOneCoordIsReach(
        index2,
        getIndexByCoord(boxs[index2].getX(), boxs[index1].getY())
      ) &&
      !boxs[
        getIndexByCoord(boxs[index2].getX(), boxs[index1].getY())
      ].getDisplay()
    ) {
      if (boxs[index1].getPicName() === boxs[index2].getPicName()) {
        return 1;
      }
    }

    //两折能否可达
    // 计算出当前边长
    let currentSideLength = Math.sqrt(sumDivNum);
    // 整理两个box上下左右的可直达的点的坐标
    let coords1 = getAllReachCoordByBox(index1);
    //console.log("coords1", coords1);
    let coords2 = getAllReachCoordByBox(index2);
    //console.log("coords2", coords2);

    for (let i = 0; i < coords1.length; i++) {
      for (let j = 0; j < coords2.length; j++) {
        if (coords1[i].x === coords2[j].x || coords1[i].y === coords2[j].y) {
          if (sameOneCoordIsReachByCoord(coords1[i], coords2[j])) {
            if (boxs[index1].getPicName() === boxs[index2].getPicName()) {
              return 2;
            }
          }
        }
      }
    }

    return -1;
  }

  // 输入坐标判断两个坐标是否可以直达
  function sameOneCoordIsReachByCoord(obj1, obj2) {
    // 计算出当前边长
    let currentSideLength = Math.sqrt(sumDivNum);

    // 先判断是x相等还是y相等
    // x相等
    if (obj1.x === obj2.x) {
      // 边界情况
      if (obj1.x < 0 || obj1.x === currentSideLength) {
        return true;
      } else {
        if (
          obj1.y < 0 ||
          obj1.y === currentSideLength ||
          obj2.y < 0 ||
          obj2.y === currentSideLength
        ) {
          return false;
        }
        return sameOneCoordIsReach(
          getIndexByCoord(obj1.x, obj1.y),
          getIndexByCoord(obj2.x, obj2.y)
        );
      }
    }
    // y相等
    else if (obj1.y === obj2.y) {
      // 边界情况
      if (obj1.y < 0 || obj1.y === currentSideLength) {
        return true;
      } else {
        if (
          obj1.x < 0 ||
          obj1.x === currentSideLength ||
          obj2.x < 0 ||
          obj2.x === currentSideLength
        ) {
          return false;
        }
        return sameOneCoordIsReach(
          getIndexByCoord(obj1.x, obj1.y),
          getIndexByCoord(obj2.x, obj2.y)
        );
      }
    }
  }

  // 获取一个box上下左右可直达的点的坐标
  function getAllReachCoordByBox(index) {
    let coords = new Array();
    let x = boxs[index].getX();
    let y = boxs[index].getY();

    // 计算出当前边长
    let currentSideLength = Math.sqrt(sumDivNum);

    // 上方
    y--;
    while (true) {
      // 如果是box就判断是否display为false
      if (y >= 0) {
        if (boxs[getIndexByCoord(x, y)].getDisplay() === false) {
          coords.push({ x: x, y: y });
        }
        //可达已经中断
        else {
          break;
        }
      }
      // 不是box说明越界直接默认可以
      else {
        coords.push({ x: x, y: y });
        break;
      }

      y--;
    }

    // 下方
    y = boxs[index].getY();
    y++;
    while (true) {
      // 如果是box就判断是否display为false
      if (y <= currentSideLength - 1) {
        if (boxs[getIndexByCoord(x, y)].getDisplay() === false) {
          coords.push({ x: x, y: y });
        }
        //可达已经中断
        else {
          break;
        }
      }
      // 不是box说明越界直接默认可以
      else {
        coords.push({ x: x, y: y });
        break;
      }

      y++;
    }

    //左方
    y = boxs[index].getY();
    x--;
    while (true) {
      // 如果是box就判断是否display为false
      if (x >= 0) {
        if (boxs[getIndexByCoord(x, y)].getDisplay() === false) {
          coords.push({ x: x, y: y });
        }
        //可达已经中断
        else {
          break;
        }
      }
      // 不是box说明越界直接默认可以
      else {
        coords.push({ x: x, y: y });
        break;
      }

      x--;
    }

    //右边
    x = boxs[index].getX();
    x++;
    while (true) {
      // 如果是box就判断是否display为false
      if (x <= currentSideLength - 1) {
        if (boxs[getIndexByCoord(x, y)].getDisplay() === false) {
          coords.push({ x: x, y: y });
        }
        //可达已经中断
        else {
          break;
        }
      }
      // 不是box说明越界直接默认可以
      else {
        coords.push({ x: x, y: y });
        break;
      }

      x++;
    }

    return coords;
  }

  // 横坐标或者纵坐标相同的点是否可达 含有box的点不包括外围
  function sameOneCoordIsReach(index1, index2) {
    // x相等，说明y不同
    if (boxs[index1].getX() === boxs[index2].getX()) {
      // 作为标记看是否有阻碍
      let flag = true;
      let min =
        boxs[index1].getY() <= boxs[index2].getY()
          ? boxs[index1].getY()
          : boxs[index2].getY();

      let max;
      min === boxs[index1].getY()
        ? (max = boxs[index2].getY())
        : (max = boxs[index1].getY());

      for (let i = min + 1; i < max; i++) {
        if (boxs[getIndexByCoord(boxs[index1].getX(), i)].getDisplay()) {
          flag = false;
        }
      }

      if (flag) {
        return true;
      }
    }
    // y相等，说明x不同
    if (boxs[index1].getY() === boxs[index2].getY()) {
      // 作为标记看是否有阻碍
      let flag = true;
      let min =
        boxs[index1].getX() <= boxs[index2].getX()
          ? boxs[index1].getX()
          : boxs[index2].getX();

      let max;
      min === boxs[index1].getX()
        ? (max = boxs[index2].getX())
        : (max = boxs[index1].getX());

      for (let i = min + 1; i < max; i++) {
        if (boxs[getIndexByCoord(i, boxs[index1].getY())].getDisplay()) {
          flag = false;
        }
      }

      if (flag) {
        return true;
      }
    }

    return false;
  }

  // 根据横纵坐标获得一个box的index
  function getIndexByCoord(x, y) {
    for (let i = 0; i < sumDivNum; i++) {
      if (boxs[i].getX() === x && boxs[i].getY() === y) {
        return i;
      }
    }

    return -1;
  }

  // 初始化界面
  function init() {
    // 每次初始化时，清空可能遗留的无效子元素
    $("#container").empty();
    // 添加足够的行元素
    for (let i = 0; i < currentSideLength + 2; i++) {
      $("#container").append(
        "<div class='line' id='line" + (i - 1) + "'></div>"
      );
    }

    // 为每个line添加元素
    // 第一行和最后一行
    for (let i = 0; i < currentSideLength + 2; i++) {
      $("#line-1").append(`<div class = 'box' id='out${i - 1}${-1}'></div>`);
      $(`#line${currentSideLength}`).append(
        `<div class = 'box' id='out${i - 1}${currentSideLength}'></div>`
      );
    }

    // 中间行
    let temBoxNum = 0;
    for (let i = 0; i < currentSideLength; i++) {
      for (let j = 0; j < currentSideLength; j++) {
        $(`#line${i}`).append(`<div class='box' id='${temBoxNum}'></div>`);
        temBoxNum++;
      }
      // 前后两个位置
      $(`#line${i}`).prepend(`<div class = 'box' id='out${-1}${i}'></div>`);
      $(`#line${i}`).append(
        `<div class = 'box' id='out${currentSideLength}${i}'></div>`
      );
    }

    // // 为main div设置大小
    // for(let i=0; i<specifications.length; i++){
    //     if(sumDivNum === specifications[i].area){
    //         $(".main").addClass("size"+(i+1));
    //         break;
    //     }
    // }

    // for(let i=0;i<sumDivNum;i++){
    //     // 添加足够数目的div
    //     $(".main").append("<div class='box' id='"+i+"'></div>");
    // }

    // 填充图片
    addBgImg();
  }

  //为div填充背景图片
  function addBgImg() {
    // 首先确定需要使用几张图片
    let currentPicNums = 0;
    for (let i = 0; i < specifications.length; i++) {
      if (sumDivNum === specifications[i].area) {
        currentPicNums = specifications[i].picNum;
      }
    }

    //确定要用哪几张
    let currentPics = new Array();
    for (let i = 0; i < currentPicNums; i++) {
      let index = randomNum(0, 8);
      if (currentPics.indexOf(pics[index]) === -1) {
        currentPics.push(pics[index]);
      } else {
        i--;
      }
    }

    for (let i = 0; i < sumDivNum; i++) {
      if (boxs[i].getPicName() === "") {
        //随机取出一张图片
        let index = randomNum(0, currentPicNums - 1);

        //顺便设置背景图片
        // $("#" + i).css(
        //   "background-image",
        //   "url('../../pic/" + currentPics[index] + ".png')"
        // );
        var img = $('<img />', { 
          src: currentPics[index],
          alt: '',
          width:'50px',draggable: false
        });
        $("#" + i).empty();
        $("#" + i).append(img)
        // 以保证背景图片适应大小
        $("#" + i).css("background-size", "cover");
        // 记录图片名称
        boxs[i].setPicName(currentPics[index]);

        // 一一对应，再找一个空的index出来
        let index2 = findAEmptyBox();
        boxs[index2].setPicName(currentPics[index]);

        //顺便设置背景图片
        // $("#" + index2).css(
        //   "background-image",
        //   "url('../../pic/" + currentPics[index] + ".png')"
        // );
        var img = $('<img />', { 
          src: currentPics[index],
          alt: '',
          width:'50px',draggable: false
        });
        $("#" + index2).empty();
        $("#" + index2).append(img)
        // 以保证背景图片适应大小
        $("#" + index2).css("background-size", "cover");
      }
    }
  }

  //生成从minNum到maxNum的随机数
  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return Math.floor(Math.random() * minNum + 1);
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      default:
        return 0;
    }
  }

  //寻找一个还未填图的块
  function findAEmptyBox() {
    //随机选一百次
    for (let i = 0; i < 100; i++) {
      let index = randomNum(0, sumDivNum - 1);
      if (boxs[index].getPicName() === "") {
        return index;
      }
    }

    //一百次都没有选中那就按顺序一一访问
    for (let i = 0; i < sumDivNum; i++) {
      if (boxs[i].getPicName() === "") {
        return i;
      }
    }

    // 还是没有结果就返回-1
    return -1;
  }

  /**
   * 产生音效
   * @param audioSrc ：音频路径
   */
  function showSound(audioSrc) {
    /**因为音效元素是追加的，所以每次生成之前，将原来的删除掉*/
    $("#hintMusic").remove();
    /**创建audio标签的Jquery对象，然后追加到body进行播放即可*/
    let audioJQ = $(
      "<audio src='" + audioSrc + "' autoplay id='hintMusic'/>"
    );
    audioJQ.appendTo("body");
  }

  console.log("======")

  return (
    <div className="container" id="container"></div>
  )
}