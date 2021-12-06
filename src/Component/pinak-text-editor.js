import React, { useState } from 'react';
import { TextEditorButtons } from '../Component/jdStyle';

// import ListIcon from '../../../../pinak-ui/svg/list.svg';
import BoldIcon from '../Icons/bold.svg';
import ItalicIcon from '../Icons/italic.svg';
// import ImgUploadIcon from '../Icons/img.svg';
import ListDotIcon from '../Icons/list_dot.svg';
import PlusBlueIcon from '../Icons/plus_blue.svg';
import PlusIcon from '../Icons/plus.svg';
import UnderlineIcon from '../Icons/underline.svg';
import DownArrowIcon from '../Icons/down_arrow.svg';
import AlignLeftIcon from '../Icons/align_left.svg';
import AlignRightIcon from '../Icons/align_right.svg';
import AlignCenterIcon from '../Icons/align_center.svg';
import { bullet } from '../Function';
const PinakTextEditor = ({ currentDiv, data, onAddSection }) => {
  const [showAddSections, setShowAddSections] = useState(false);
  console.log(currentDiv);
  const ele = document.getElementById(currentDiv);

  return (
    <>
      <TextEditorButtons className="px-5 templates">
        Templates &nbsp;&nbsp;&nbsp;&nbsp;
        <img src={DownArrowIcon} />
      </TextEditorButtons>
      <TextEditorButtons
        onMouseDown={event => event.preventDefault()}
        onClick={() => {
          // if (ele.firstChild.nodeName == 'B') {
          //   const text = ele.innerText;
          //   ele.innerHTML = '<></>';
          //   ele.innerText = text;
          // } else {
          //   const create = document.createElement('b');
          //   // const child = document.createElement('li');
          //   // child.innerText = ele.innerText;
          //   create.innerText = ele.innerText;
          //   // console.log(create);
          //   ele.innerHTML = '';
          //   ele.appendChild(create);
          // }
          document.execCommand('bold', false, '');
        }}
      >
        <img src={BoldIcon} />
      </TextEditorButtons>
      <TextEditorButtons
        onMouseDown={event => event.preventDefault()}
        onClick={() => {
          // if (ele.firstChild.nodeName == 'I') {
          //   const text = ele.innerText;
          //   ele.innerHTML = '<></>';
          //   ele.innerText = text;
          // } else {
          //   const create = document.createElement('i');
          //   // const child = document.createElement('li');
          //   // child.innerText = ele.innerText;
          //   create.innerText = ele.innerText;
          //   // console.log(create);
          //   ele.innerHTML = '';
          //   ele.appendChild(create);
          // } // document.getElementById(currentDiv).style.fontStyle = 'italic';
          document.execCommand('italic', false, '');
        }}
      >
        <img src={ItalicIcon} />
      </TextEditorButtons>
      <TextEditorButtons
        onMouseDown={event => event.preventDefault()}
        onClick={() => {
          // if (ele.firstChild.nodeName == 'U') {
          //   const text = ele.innerText;
          //   ele.innerHTML = '<></>';
          //   ele.innerText = text;
          // } else {
          //   const create = document.createElement('u');
          //   // const child = document.createElement('li');
          //   // child.innerText = ele.innerText;
          //   create.innerText = ele.innerText;
          //   // console.log(create);
          //   ele.innerHTML = '';
          //   ele.appendChild(create);
          // }
          // document.getElementById(currentDiv).style.textDecoration =
          //   'underline';
          document.execCommand('underline', false, '');
        }}
      >
        <img src={UnderlineIcon} />
      </TextEditorButtons>
      <TextEditorButtons
        onMouseDown={event => event.preventDefault()}
        onClick={() => {
          // document.getElementById(currentDiv).style.textAlign = 'left';
          // document.execCommand('justifyLeft', false, '');

          let classes = ele?.className;
          classes = classes?.split(' ');

          if (!classes?.includes('left')) {
            classes?.push(' left');
            classes = classes?.filter(i => i != 'center');
            classes = classes?.filter(i => i != 'right');
          }
          // else classes = classes.filter((i) => i != 'center');
          classes = classes.join(' ');
          ele.className = classes.toString();
          document.getElementById('saveDraft')?.click();
        }}
      >
        <img src={AlignLeftIcon} />
      </TextEditorButtons>
      <TextEditorButtons
        onMouseDown={event => event.preventDefault()}
        onClick={() => {
          // console.log(ele.firstElementChild);
          let classes = ele?.className;
          classes = classes?.split(' ');

          if (!classes?.includes('center')) {
            classes?.push(' center');
            classes = classes?.filter(i => i != 'right');
            classes = classes?.filter(i => i != 'left');
          }
          // else classes = classes.filter((i) => i != 'center');
          classes = classes?.join(' ');
          ele.className = classes?.toString();
          document.getElementById('saveDraft')?.click();
          // document.getElementById(currentDiv).style.fontWeight = '800';
          // console.log(ele, 'asdf');
          // document.execCommand('justifyCenter', false, '');
        }}
      >
        <img src={AlignCenterIcon} />
      </TextEditorButtons>
      <TextEditorButtons
        onMouseDown={event => {
          event.preventDefault();
        }}
        onClick={() => {
          let classes = ele?.className;
          classes = classes?.split(' ');
          console.log(classes);
          if (!classes?.includes('right')) {
            classes?.push('right');
            classes = classes?.filter(i => i != 'center');
            classes = classes?.filter(i => i != 'left');
          }
          // else classes = classes.filter((i) => i != 'center');
          classes = classes?.join(' ');
          ele.className = classes?.toString();
          document.getElementById('saveDraft')?.click();
          // document.getElementById(currentDiv).style.textAlign = 'right'; // execCommand('justifyRight', false, '');
        }}
      >
        <img src={AlignRightIcon} />
      </TextEditorButtons>
      {/* <TextEditorButtons
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          document.execCommand('insertOrderedList', false, '');
        }}
      >
        <ListIcon />
      </TextEditorButtons> */}
      <TextEditorButtons
        onMouseDown={event => {
          event.preventDefault();
        }}
        onClick={e => {
          //  if (document.execCommand('insertUnorderedList', false, '')) return;
          bullet(currentDiv);

          //
        }}
      >
        <img src={ListDotIcon} />

        {/* <ListIcon /> */}
      </TextEditorButtons>
      {/* <TextEditorButtons>
        <ImgUploadIcon />
      </TextEditorButtons> */}
      <div>
        <TextEditorButtons
          tabIndex={0}
          onBlur={() => setTimeout(() => setShowAddSections(false), 700)}
          onFocus={() => setShowAddSections(true)}
          className="px-3 add-section"
        >
          <img src={PlusBlueIcon} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Add Section
        </TextEditorButtons>
        {showAddSections && (
          <div
            className="position-absolute bg-white"
            style={{
              borderRadius: '6px',
              zIndex: 1,
              maxHeight: '277px',
              overflow: 'auto',
              boxShadow: '0px 1px 8px 2px rgba(0, 0, 0, 0.15)',
            }}
          >
            <ul className="list-group">
              {data &&
                data.map(section => (
                  <li
                    key={section.id}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onAddSection(section);
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {section.value}
                      <img src={PlusIcon} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PinakTextEditor;
