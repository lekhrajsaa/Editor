// export const helperFunc = (json, _tmp, ul) => {
//   json.children &&
//     json.children.map((ele) => {
//       // if (ele?.children ? [0] : '') console.log(typeof ele?.children[0]);
//       if (typeof ele === 'string') {
//         _tmp.push(ele);
//       } else {
//         if (ele.children.length > 1) {
//           helperFunc(ele, _tmp, ul);
//         } else if (typeof ele.children[0] == 'object') {
//           helperFunc(ele, _tmp, ul);
//         } else {
//           if (ele.children.length > 0) {
//             ul
//               ? _tmp.push(
//                   '<' +
//                     json.tagName +
//                     ' style="padding:0 0 0 18px;" >' +
//                     '<' +
//                     ele.tagName +
//                     '>' +
//                     ele.children[0] +
//                     '</' +
//                     ele.tagName +
//                     '>' +
//                     '</' +
//                     json.tagName +
//                     '>',
//                 )
//               : _tmp.push(
//                   json.tagName == 'LI'
//                     ? '<' +
//                         json.tagName +
//                         ' style="padding-top:0">' +
//                         '<' +
//                         ele.tagName +
//                         '>' +
//                         ele.children[0] +
//                         '</' +
//                         ele.tagName +
//                         '>' +
//                         '</' +
//                         json.tagName +
//                         '>'
//                     : '',
//                 );
//           }
//         }
//       }
//     });

//   return [_tmp.join('')];
// };
const convertor = (json, temp, ul) => {
  var arr = [];
  if (!json) return;

  json.children?.map(element => {
    if (typeof element === 'string') arr.push(element);
    else if (typeof element == 'object') {
      if (element.tagName == 'UL' && ul) {
        arr.push(
          '<' +
            element.tagName.toLowerCase() +
            ' style="margin:0; padding-left: 16px"; >' +
            convertor(element) +
            '</' +
            element.tagName.toLowerCase() +
            '>'
        );
      } else {
        arr.push(
          '<' +
            element.tagName.toLowerCase() +
            ' style="margin:0; padding-top: 0"; >' +
            convertor(element) +
            '</' +
            element.tagName.toLowerCase() +
            '>'
        );
      }
    }
  });

  return arr.join('');
};
export const jsonToHtml = props => {
  var tempArr = [];
  // console.log(props);
  // console.log([convertor(props)]);
  if (props?.b) {
    return [convertor(props.data, [], true)];
    // return helperFunc(props.data, tempArr, true);
  } else return [convertor(props, [], false)];
};

// export const helperFunc = (json, _tmp) => {
//   json.children &&
//     json.children.map((ele) => {
//       // if (ele?.children ? [0] : '') console.log(typeof ele?.children[0]);
//       if (typeof ele === 'string') {
//         _tmp.push(ele);
//       } else {
//         if (ele.children.length > 1) {
//           helperFunc(ele, _tmp, ul);
//         } else if (typeof ele.children[0] == 'object') {
//           helperFunc(ele, _tmp, ul);
//         } else {
//           if (ele.children.length > 0) {
//             ul
//               ? _tmp.push(
//                   '<' +
//                     json.tagName +
//                     ' style="padding:0 0 0 18px;" >' +
//                     '<' +
//                     ele.tagName +
//                     '>' +
//                     ele.children[0] +
//                     '</' +
//                     ele.tagName +
//                     '>' +
//                     '</' +
//                     json.tagName +
//                     '>',
//                 )
//               : _tmp.push(
//                   '<' +
//                     json.tagName +
//                     ' style="padding-top:0">' +
//                     '<' +
//                     ele.tagName +
//                     '>' +
//                     ele.children[0] +
//                     '</' +
//                     ele.tagName +
//                     '>' +
//                     '</' +
//                     json.tagName +
//                     '>',
//                 );
//           }
//         }
//       }
//     });

//   return [_tmp.join('')];
// };

// export const jsonToHtml = (props) => {
//   var tempArr = [];
//   console.log(props);
//   if (props?.b) {
//     return helperFunc(props.data, tempArr, true);
//   } else return helperFunc(props, tempArr, false);
// };

// export const helperFunc = (json, _tmp) => {
//   json.children &&
//     json.children.map((ele) => {
//       if (typeof ele === 'string') {
//         _tmp.push(ele);
//       } else {
//         if (ele.children.length > 1) {
//           helperFunc(ele, _tmp);
//         } else if (typeof ele.children[0] == 'object') {
//           helperFunc(ele, _tmp);
//         } else {
//           if (ele.children.length > 0) {
//             _tmp.push(
//               '<' +
//                 ele.tagName +
//                 '>' +
//                 ele.children[0] +
//                 '</' +
//                 ele.tagName +
//                 '>',
//             );
//           }
//         }
//       }
//     });

//   return [_tmp.join('')];
// };

// export const jsonToHtml = (json) => {
//   var tempArr = [];
//   return helperFunc(json, tempArr);
// };
