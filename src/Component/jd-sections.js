import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ItemTypes } from './item-types';
import { EditorSection } from '../Component/jdStyle';
import { Sentence } from './sentence';
import { jsonToHtml } from '../Utils/json-to-html';
import DragIcon from '../Icons/drag_icon.svg';
import DeleteIcon from '../Icons/delete.svg';
// import { parse } from 'dotenv';
var first = false;

const JdSections = ({
  // jdData,
  onclick,
  NEW,
  setCards,
  cards,
  section,
  moveCard,
  index,
  showKeyWords,
  deleteSection,
  createSectionRow,
  getRoleId,
  generateCSV,
  deleteSectionRow,
  moveSentenceCard,
  sliceReleatedSentences,
  selectedKeywords,
}) => {
  const [newTag, setnewTag] = useState();
  const [currentSentenceId, setCurrentSentenceId] = useState('');
  const ref = useRef(null);

  const { id, sentences } = section;
  // sentences = ['Ankur is a good boy'];
  const [value, setValue] = useState(section.value);
  const divId = id; //value.replace(/ /g, '').toLowerCase();

  useEffect(() => {
    // var time = setTimeout(() => {
    //   if (currentSentenceId) {
    //     showKeyWords(id, currentSentenceId);
    //   }
    // }, 100);
    // return () => {
    //   clearTimeout(time);
    // };
  }, [currentSentenceId]);

  const handleSentenceClick = sentenceId => {
    // if clicked sentence is same as the existing current sentence,
    // showkeywords needs to be called explicitly since, useeffect will not be called.
    // console.log(id, 'ID IS COMMING');
    // if (sentenceId == currentSentenceId) return showKeyWords(id, sentenceId);
    // setCurrentSentenceId(sentenceId);
  };

  const getHighlightedKeywords = itemText => {
    // const selectedKeywords = section.selectedKeywords;
    // let highlightedSentence = itemText;
    // selectedKeywords.forEach(_keywordId => {
    //   const keyword = section.keywords.find(
    //     ({ id: keyword_id }) => keyword_id === _keywordId
    //   );
    //   if (keyword) {
    //     const index = highlightedSentence
    //       .toLowerCase()
    //       .indexOf(keyword.value.toLowerCase());
    //     if (index > -1) {
    //       const leftPart = highlightedSentence.slice(0, index);
    //       const rightPart = highlightedSentence.slice(
    //         index + keyword.value.length
    //       );
    //       highlightedSentence = [
    //         leftPart,
    //         '",{"tagName": "B","attributes": [],"children": ["' +
    //           highlightedSentence.slice(index, index + keyword.value.length) +
    //           '"]},"',
    //         rightPart,
    //       ].join('');
    //     }
    //   }
    // });
    // return highlightedSentence;
  };

  const [{ handlerId }, drop] = useDrop({
    accept: [ItemTypes.SORT_CARD, ItemTypes.CARD],
    drop: item => {
      if (item.text) {
        const finalSentence = getHighlightedKeywords(item.text);
        createSectionRow({
          sectionId: id,
          divId: `${divId}`,
          sectionIndex: index,
          text: finalSentence,
          sentenceId: item.id,
          isDropped: true,
        });

        sliceReleatedSentences(item);
      }
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!item.text) {
        // stopping sortable when dragging releated items.
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        setTimeout(() => {
          moveCard(dragIndex, hoverIndex);
        });

        item.index = hoverIndex;
      }
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SORT_CARD,
    item: () => {
      return { id, index };
    },

    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  const handleDelete = (e, sectionIndex, sentenceIndex, refVal) => {
    // backspace
    const value = refVal.innerHTML;
    if (e.keyCode === 8) {
      if (sentences.length > 1 && (value.length === 0 || value == '<br>')) {
        deleteSectionRow({ sectionIndex, sentenceIndex });
      }
    }
  };

  const handleEnter = e => {
    //enter
    if (e.keyCode === 13) {
      const currSentenceIndex = sentences.findIndex(
        s => s.id === currentSentenceId
      );
      // console.log(currSentenceIndex, sentences);
      // + 1, 'current');
      createSectionRow({
        sectionIndex: index,
        sectionId: id,
        sentenceIndex: currSentenceIndex,
        divId,
        id: currentSentenceId,
      });
      e.preventDefault();
    }
  };

  const [t, setT] = useState(false);

  // removed usecallback because moveSentenceCard is getting memoised
  // console.log(sentences, 'SENTENCES');
  const GetSentences = () =>
    sentences &&
    sentences.map((elem, i) => {
      var sentenceId = elem?.id;
      var txt = jsonToHtml(JSON.parse(elem.value));
      const [_e] = txt;
      let classes = JSON.parse(elem.value);
      classes = classes.attributes.filter(i => i.name == 'class');

      if (classes?.length > 0) {
        classes = classes[0].value.toString();
        // console.log(classes.toString().match('center'));

        let temp = classes;
        classes = classes?.match('center');
        if (!classes) classes = temp.match('right');
        else if (!classes) classes = temp.match('left');

        if (temp.match(' bold') && classes) {
          classes[0] += ' bold';
        } else {
          classes = temp.match('bold');
        }
      }

      return (
        <Sentence
          // onclick={onclick}
          className={classes ? classes[0] : 'left'}
          NEW={NEW}
          sectionId={section.id}
          getRoleId={getRoleId}
          generateCSV={generateCSV}
          index={i}
          TopKeywords={newTag}
          value={_e}
          sectionIndex={index}
          key={elem.id}
          sentenceId={sentenceId}
          onClick={() => {
            console.log(sentenceId, 'click');
            onclick(sentenceId);
            handleSentenceClick(sentenceId);
          }}
          divId={`${divId}_content`}
          onKeyDown={(e, refVal) => {
            if (e.keyCode === 8) {
              handleDelete(e, index, i, refVal);
              setT(false);
            } else setT({ e: e, index, i, ref: refVal.innerHTML });
          }}
          moveSentenceCard={moveSentenceCard}
          deleteSectionRow={deleteSectionRow}
          createSectionRow={createSectionRow}
        />
      );
    });

  return (
    <EditorSection
      ref={ref}
      key={divId}
      id={divId}
      style={{ opacity }}
      data-section-id={id}
      data-sentence-id={currentSentenceId}
      // onClick={showKeyWords}
      onKeyDown={handleEnter}
      className={`editor px-3 showhim`}
      data-handler-id={'handlerId'}
    >
      <div className="row options-div">
        <div className="col-lg-10">
          <span
            className="drag-icon showme"
            style={{ position: 'absolute', left: -20 }}
          >
            <img src={DragIcon} height="12" />
          </span>
          <input
            onChange={e => {
              cards[index].value = e.target.value;
              setValue(e.target.value);
            }}
            value={value}
            style={{
              outline: 'none',
              border: 'none',
              width: '100%',
              height: '100%',
              wordBreak: 'break-all',
              fontSize: '19px',
              fontWeight: 'bold',
              marginBottom: '3px',
            }}
          ></input>
        </div>
        <div className="col-lg-2 pr-0 text-right showme">
          <span
            className="pr-2"
            style={{ cursor: 'pointer' }}
            onClick={() => deleteSection({ sectionIndex: index })}
          >
            <img src={DeleteIcon} height={12} />
          </span>
        </div>
      </div>

      <div
        id={`${divId}_content`}
        style={{
          textAlign: 'left',
        }}
      >
        {GetSentences()}
      </div>
    </EditorSection>
  );
};

export default JdSections;
