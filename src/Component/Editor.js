// import React from 'react';
// // import Style from 'styled-components';
// import Style from 'styled-components';
// import JDHeader from './JdHeader';
// import { TextEditorButtonsWrapper } from '../Component/jdStyle';
// import PinakTextEditor from './pinak-text-editor';
// import JdSections from './jd-sections';
// var cards = [
//   {
//     id: '0',
//     keywords: [],
//     sentences: [],
//     value: 'First header',
//   },
//   {
//     id: '0',
//     keywords: [],
//     sentences: [],
//     value: 'First header',
//   },
//   {
//     id: '0',
//     keywords: [],
//     sentences: [],
//     value: 'First header',
//   },
// ];

// const Editor = () => {
//   var jobTitle = 'Ankur LTD';
//   return (
//     <div className="p-row">
//       {/* Left side panel */}
//       <div className="col-lg-12 p-0">
//         <div
//           className="row"
//           style={{
//             position: 'sticky',
//             top: '0px',
//             zIndex: 10,
//             maxWidth: '100%',
//           }}
//         >
//           <TextEditorButtonsWrapper className="col-12  ">
//             <PinakTextEditor
//               data={[{ id: 30, value: 'Header ' }]}
//               // onAddSection={handleAddSection}
//               // currentDiv={StyledDiv}
//             />
//           </TextEditorButtonsWrapper>
//         </div>
//         {/* Text Editor */}
//         <MainContainer className="bg-white p-5">
//           <div id="p-text-editor">
//             <JDHeader
//             // companyName={companyName}
//             // setCompanyName={setCompanyName}
//             // companyLogoUrl={companyLogoUrl}
//             // companyLocation={companyLocation}
//             // setCompanyLogoUrl={setCompanyLogoUrl}
//             // setCompanyLocation={setCompanyLocation}
//             />
//             <h4 className="text-center mb-4">{jobTitle}</h4>
//             {/* {console.log(cards, 'ankur chaurasia')} */}
//             {/* {cards.length > 0 &&
//               cards.map((section, i) => (
//                 <>
//                   <JdSections
//                     onclick={ChangeDiv}
//                     setCards={setCards}
//                     cards={cards}
//                     NEW={NEW}
//                     index={i}
//                     getRoleId={getRoleId}
//                     generateCSV={generateCSV}
//                     key={section.id + i}
//                     section={section}
//                     moveCard={moveCard}
//                     showKeyWords={showKeyWords}
//                     deleteSection={deleteSection}
//                     moveSentenceCard={moveSentenceCard}
//                     deleteSectionRow={deleteSectionRow}
//                     createSectionRow={createSectionRow}
//                     sliceReleatedSentences={sliceReleatedSentences}
//                     selectedKeywords={selectedKeywords}
//                   />
//                 </>
//               ))} */}
//           </div>
//         </MainContainer>
//       </div>
//     </div>
//   );
// };
// const MainContainer = Style.div`
//   margin: 3.4rem 4.5rem;
//   min-height: 100vh;
//   border-radius: 8px;
//   box-shadow: 0px 2px 10px rgba(135, 169, 204, 0.25);
// `;
// export default Editor;
import React, { useState, useCallback, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import Style from 'styled-components';
import JDHeader from './JdHeader';
// import { TextEditorButtonsWrapper } from '../Component/jdStyle';
import PinakTextEditor from './pinak-text-editor';
import JdSections from './jd-sections';
import { nanoid } from 'nanoid';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
// import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import JdPreview from '';
// import { debounce } from '../../../utils/debounce';
// import ReleatedCard from './includes/releated-card';
// import CreateJdHeader from './includes/create-jd-header';
// import PinakTextEditor from './includes/pinak-text-editor';
// import JDReleatedSentences from './includes/jd-releated-sentences';
import {
  KeywordPill,
  MainContainer,
  TextEditorButtonsWrapper,
} from '../Component/jdStyle';
//
// import { actionCreators } from '../../../store/jd/actions';
// import JdPreviewModal from './includes/jd-preview-modal';
//

// import dynamic from 'next/dynamic';
// const Layout = dynamic(() => import('../../../layout/layout'));
// const JdPreview = dynamic(() => import('./includes/jd-preview'));
// const JdSections = dynamic(() => import('./includes/jd-sections'));
// const JDKeySkills = dynamic(() => import('./includes/jd-key-skills'));

import {
  modifyJDJson,
  generateJson,
  createRowHelper,
  createPublishJson,
  getSelectedKeywords,
  addSentencesInCreateJd,
} from '../Utils/create-jd-utils';
// import JdPublishModal from './jd-publish-modal';

var card = [
  {
    id: '0',
    keywords: [],
    sentences: [],
    value: 'First header',
  },
  {
    id: '0',
    keywords: [],
    sentences: [],
    value: 'First header',
  },
  {
    id: '0',
    keywords: [],
    sentences: [],
    value: 'First header',
  },
];
// const Pdf = e => {
//   const input = document.getElementById('p-text-editor');
//   html2canvas(input)
//     .then(canvas => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF();
//       pdf.addImage(imgData, 'png', 5, 10, 190, 0);

//       pdf.save('download.pdf');
//     })
//     .catch(() => {});
// };
const Editor = ({ jdId, roleId, isEditPage, templateId, NEW }) => {
  const MINUTE_MS = 800 * 1;
  const pairsRef = useRef({});
  const leafPairsRef = useRef({});
  const [StyledDiv, ChangeDiv] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [currentSentenceId, setCurrentSentenceId] = useState('');
  // const [isLoaded, setIsLoaded] = useState(false);
  const [templateSections, setTemplateSections] = useState([]);
  const [cards, setCards] = useState([]);
  // const [showModal, setShowModal] = useState();
  const [companyName, setCompanyName] = useState('');
  const [companyLogoUrl, setCompanyLogoUrl] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [releatedSentences, setReleatedSentences] = useState([]);
  // const [showPublishModal, setShowPublishModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('SDE');
  // const [JdId, setJdId] = useState(jdId);
  //
  // const dispatch = useDispatch();
  // const jdData = useSelector(state => state.jdReducer);
  // console.log(cards, 'Api Response');
  // const handleEventListner = useCallback(
  //   debounce(() => {
  //     // console.log('CLICK WHEN SAVE');
  //     document.getElementById('saveDraft')?.click();
  //   }, MINUTE_MS),
  //   []
  // );

  // AUTOMATIC SUBMIT
  // one time jobs.
  // useEffect(() => {
  //   const editor = document.getElementById('p-text-editor');
  //   editor?.addEventListener('input', handleEventListner);

  //   return () => {
  //     editor?.removeEventListener('input', handleEventListner);
  //   };
  // });

  // useEffect(
  //   useCallback(() => {
  //     if (isEditPage) {
  //       dispatch(actionCreators.getJDById(jdId));
  //     } else {
  //       // console.log);
  //       if (templateId != -1)
  //         dispatch(actionCreators.getTemplateSections(roleId, templateId));
  //       //dispatch(actionCreators.getSections(roleId));
  //     }
  //     sessionStorage.setItem('keywordCache', '{}');
  //     setJobTitle(localStorage.getItem('selectedRoleName'));

  //     // reset jd store
  //     return () => dispatch(actionCreators.init());
  //   }, [jdData]),
  //   []
  // );

  // useEffect(() => {
  //   //edit flow

  //   if (isLoaded === false) {
  //     if (jdData && jdData.getJdById && jdData?.getJdById?.status) {
  //       const { jd } = jdData.getJdById;
  //       // console.log(jd, 'ankur chaurasia');
  //       var _data = modifyJDJson(jd).modifiedJson;
  //       // console.log(_data, 'Ankur redpositive');

  //       // Push all sections and sentence
  //       setCards(_data);
  //       setTemplateSections(_data);

  //       setCompanyName(jd.company.name);
  //       setCompanyLogoUrl(jd.company.logo_url);
  //       setCompanyLocation(jd.company.location);
  //       setIsLoaded(true);
  //       setJobTitle(jd.job_role_name);
  //     }
  //     //create flow
  //     else if (jdData && jdData.sections && jdData.sections.status) {
  //       const { sections } = jdData.sections;
  //       console.log(jdData, 'ankur is');
  //       if (!jdData.keywords) getKeywords(sections.map(s => s.id).join(','));
  //       else if (jdData.keywords && jdData.keywords.status) {
  //         const { keywords } = jdData.keywords;

  //         var _data = addSentencesInCreateJd(sections, keywords); // creates place holder sentences.

  //         setCards(_data);
  //         setTemplateSections(_data);
  //         setIsLoaded(true);
  //       }
  //     }
  //   } else if (jdData && jdData.keywords && jdData.keywords.status) {
  //     //releated sentences...
  //     if (jdData && jdData.sentences && jdData.sentences.status) {
  //       const { sentences } = jdData.sentences;
  //       setReleatedSentences(sentences);
  //     } else {
  //       const { sentences } = jdData.keywords;
  //       setReleatedSentences(sentences);
  //     }
  //   }

  //   // First draft save.
  //   if (jdData && jdData.createJd && jdData.createJd.status) {
  //     const { id } = jdData.createJd;
  //     //replacing url with out reloading...
  //     window.history.replaceState('', 'Draft JD', '/draft-jd/' + id);
  //   }
  // }, [jdData]);

  // useEffect(() => {
  //   currentSection?.id && getKeywords(currentSection.id);
  // }, [currentSection]);

  const sliceReleatedSentences = item => {
    let _releatedSentences = JSON.parse(JSON.stringify(releatedSentences));
    for (var i = _releatedSentences.length - 1; i >= 0; i--) {
      if (_releatedSentences[i].id === item.id) {
        _releatedSentences.splice(i, 1);
      }
    }
    // setReleatedSentences(_releatedSentences);
  };

  const getRoleId = () => {};
  // const publishJd = () => {
  //   // edit flow
  //   if (jdData && jdData.getJdById && jdData.getJdById.status) {
  //     const { id } = jdData.getJdById.jd;
  //     // console.log(id, 'New Publish');
  //     dispatch(actionCreators.publishJd(id));
  //   } else {
  //     if (jdData.createJd) {
  //       const { id } = jdData.createJd;
  //       setJdId(id);
  //       dispatch(actionCreators.publishJd(id));
  //     }
  //   }
  //   // TODO show only if succeed.
  //   setShowPublishModal(true);
  // };

  // const saveDraft = async () => {
  //   const keywords = getSelectedKeywords(cards);

  //   const { sections, sentences, latestData } = generateJson(cards);
  //   const _companyName = document.getElementById('company-name').innerHTML;
  //   const _companyLocation =
  //     document.getElementById('company-location').innerHTML;

  //   const newSentence = sentences.map(item => {
  //     if (item.keywords === true)
  //       return {
  //         id: item.id,
  //         section_id: item.section_id,
  //         value: item.value,
  //       };
  //     else return item;
  //   });

  //   setCards(latestData);
  //   const submitJson = createPublishJson({
  //     roleId,
  //     sections,
  //     keywords,
  //     sentences: newSentence,
  //     companyName: _companyName,
  //     companyLogoUrl: companyLogoUrl,
  //     companyLocation: _companyLocation,
  //   });
  //   // console.log(submitJson, 'New sentence');
  //   if (_companyName && _companyLocation) {
  //     setCompanyName(_companyName);
  //     setCompanyLocation(_companyLocation);

  //     if (isEditPage) {
  //       // works for edit and draft js routes.
  //       if (jdData && jdData.getJdById && jdData.getJdById.status) {
  //         const { id, role_id } = jdData.getJdById.jd;
  //         submitJson['role_id'] = role_id;

  //         dispatch(actionCreators.editJd(submitJson, id));
  //       }
  //     } else {
  //       var draftJd = window.location.pathname.indexOf('/draft-jd/') > -1;
  //       if (draftJd) {
  //         if (jdData && jdData.createJd && jdData.createJd.status) {
  //           const id = jdData?.createJd?.id;
  //           dispatch(actionCreators.editJd(submitJson, id));
  //         }
  //       } else {
  //         console.log(submitJson, 'New Publish');
  //         dispatch(actionCreators.createJd(submitJson));
  //       }
  //     }
  //   } else {
  //     console.log('Name and location are required.');
  //   }
  // };

  const createSectionRow = async ({
    text,
    sectionIndex,
    sectionId,
    sentenceIndex,
    divId,
    sentenceId,
    isDropped,
    id,
  }) => {
    var temp = JSON.parse(JSON.stringify(cards));
    //generating the sentences json by looping the dom.
    temp[sectionIndex]['sentences'] = createRowHelper(
      divId + '_content',
      sectionId,
      temp[sectionIndex]['sentences']
    );
    // creating new sentence json.
    // text -> contains text if some body drg and drop
    var _item = {
      id: sentenceId || nanoid(30), // from drag releated sentence item we get sentenceId..
      section_id: sectionId,
      value: text
        ? '{"tagName":"P","attributes":[],"children":["' + text + '"]}'
        : '{"tagName":"P","attributes":[{"autofocus":"true"}],"children":[""]}',
      keywords: isDropped ? selectedKeywords : [],
    };

    // console.log(_item);
    if (sentenceIndex > -1) {
      // console.log(sentenceIndex, 'INDEX');
      // console.log(sentenceIndex, temp[sectionIndex]['sentences'], 'Index');

      await temp[sectionIndex]['sentences'].splice(sentenceIndex + 1, 0, _item);
    } else {
      // drag item
      temp[sectionIndex]['sentences'].push(_item);
    }

    setCards([...temp]);
  };

  const deleteSectionRow = ({ sectionIndex, sentenceIndex }) => {
    const { latestData } = generateJson(cards);
    var temp = JSON.parse(JSON.stringify(latestData));

    temp[sectionIndex]['sentences'].splice(sentenceIndex, 1);
    const data = temp[sectionIndex]['sentences'];
    if (sentenceIndex - 1 >= 0) {
      const element = document.getElementById(data[sentenceIndex - 1].id);
      if (element?.innerText?.toString().length) {
        var setpos = document.createRange();
        var set = window.getSelection();
        var count = 0;
        const t = element.innerHTML.toString();
        for (var i = 0; i < element.innerHTML.toString().length; i++) {
          if (t[i] === '</') count++;
        }

        setpos?.setStart(element, count >= 0 ? count + 1 : 0);
        setpos.collapse(true);

        set.removeAllRanges();
        set.addRange(setpos);
      }
      element?.focus();
    }
    setCards([...temp]);
    // handleEventListner();
  };

  const deleteSection = ({ sectionIndex }) => {
    var r = true;
    // var r = confirm(
    //   'Are you sure? All sentences in the section will be deleted.'
    // );
    if (r == true) {
      var temp = JSON.parse(JSON.stringify(cards));
      temp.splice(sectionIndex, 1);
      setCards([...temp]);
    }
  };

  const moveCard = (dragIndex, hoverIndex) => {
    //useCallback(
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };

  const moveSentenceCard = (sectionIndex, dragIndex, hoverIndex) => {
    //useCallback(
    // var _cards = JSON.parse(JSON.stringify(cards));
    const { latestData: _cards } = generateJson(cards);

    var item = _cards[sectionIndex]['sentences'];
    var dragItem = item[dragIndex];

    // item.splice(dragIndex, 1);
    // item.splice(hoverIndex, 0, dragItem);
    _cards[sectionIndex]['sentences'] = update(item, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem],
      ],
    });

    setCards(_cards);
  };
  // const renderPreview = (section, index) => {
  //   return <JdPreview key={section.id} section={section} />;
  // };

  // const renderReleated = (sentence, index) => {
  //   return (
  //     <ReleatedCard
  //       index={index}
  //       id={sentence.id}
  //       key={sentence.id}
  //       text={sentence.value}
  //       moveCard={() => null}
  //     />
  //   );
  // };

  const showKeyWords = useCallback(
    (sectionId, sentenceId) => {
      var sections = cards.filter(section => section.id == sectionId);
      // console.log(sections, 'SECTIONS');
      if (templateId != -1) {
        setCurrentSentenceId(sentenceId);
        setCurrentSection(sections[0]);
      }
      // const sectionKeywords = jdData?.keywords?.keywords.find(sections[0].id)
      // sectionKeywords.sentences
      // setReleatedSentences()\

      if (sectionId != currentSection?.id) {
        setReleatedSentences([]);
      }
    },
    [currentSection, currentSentenceId, selectedKeywords, cards]
  );

  // const getParentChildKeywordPair = _selectedKeywords => {
  //   let pair = { children: [], parents: [] };
  //   _selectedKeywords.forEach(keyword => {
  //     keyword.children.forEach(child => {
  //       pair.children.push(child.id);
  //       pair.parents.push(keyword.id);
  //     });
  //   });
  //   return pair;
  // };

  // const getReleatedSentences = (keyword_id, section_id) => {
  //   const _selectedKeywords = selectedKeywords.filter(
  //     k =>
  //       k.id == keyword_id &&
  //       k.section_id === section_id &&
  //       k.children.length > 0
  //   );
  //   if (_selectedKeywords.length == 0) {
  //     // todo: clear sentences in store, instead of state
  //     setReleatedSentences([]);
  //     return;
  //   }

  //   const pair = getParentChildKeywordPair(_selectedKeywords);
  //   if (pair.children.length > 0 && section_id && getRoleId()) {
  //     dispatch(
  //       actionCreators.getSentences(
  //         getRoleId(),
  //         section_id,
  //         pair.parents.join(','),
  //         pair.children.join(',')
  //       )
  //     );
  //   }
  // };

  const handleAddSection = targetSection => {
    setCards([...cards, { ...targetSection, id: nanoid(30), sentences: [] }]);
  };

  const getFlatTree = (tree, parentId) => {
    let parentIds = [];
    let ids = [];
    if (tree) {
      Object.keys(tree).forEach(key => {
        if (!tree[key] || Object.keys(tree[key]).length == 0) {
          ids.push(key);
          parentIds.push(parentId);
        } else {
          const result = getFlatTree(tree[key], key);
          ids = [...ids, key, ...result[0]];
          parentIds = [...parentIds, parentId, ...result[1]];
        }
      });
    }
    return [ids, parentIds];
  };

  // // create a tree structure from leafPairs and pairs
  const generateCSV = sectionId => {
    const leafPairs = leafPairsRef.current[sectionId] || {};
    const pairs = pairsRef.current[sectionId] || {};

    const tree = {};

    // update leafPairs
    Object.values(leafPairs).forEach(leafBranch => {
      currNode = tree;
      leafBranch.forEach(nodeId => {
        if (!currNode[nodeId + 'T']) {
          currNode[nodeId + 'T'] = {};
        }
        currNode = currNode[nodeId + 'T'];
      });
    });

    let currNode = tree;
    if (pairs[1]) {
      if (!currNode[pairs[1][0] + 'T']) {
        currNode[pairs[1][0] + 'T'] = {};
      }
      currNode = currNode[pairs[1][0] + 'T'];
      Object.values(pairs).forEach(pair => {
        if (!currNode[pair[1] + 'T']) {
          currNode[pair[1] + 'T'] = {};
        }
        currNode = currNode[pair[1] + 'T'];
      });
    }

    const [_childIds, _parentIds] = getFlatTree(tree, null);

    const childIds = [];
    const parentIds = [];
    for (let i = 0; i < _parentIds.length; i++) {
      if (_parentIds[i]) {
        parentIds.push(_parentIds[i].substring(0, _parentIds[i].length - 1));
        childIds.push(_childIds[i].substring(0, _childIds[i].length - 1));
      }
    }
    return {
      parentIds,
      childIds,
    };
  };

  // const getKeywords = async sectionId => {
  //   dispatch(actionCreators.getKeywords(getRoleId(), sectionId, '', ''));
  // };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-row">
        {/* Left side panel */}
        <div className="col-lg-12 p-0" style={{ width: '100%' }}>
          <div
            className="p-row"
            style={{ position: 'sticky', top: '0px', zIndex: 10 }}
          >
            <TextEditorButtonsWrapper className="col p-0">
              <PinakTextEditor
                data={
                  templateSections.length
                    ? templateSections
                    : [{ id: nanoid(30), value: `Header  ` }]
                }
                onAddSection={handleAddSection}
                currentDiv={StyledDiv}
              />
            </TextEditorButtonsWrapper>
          </div>
          {/* Text Editor */}
          <MainContainer className="bg-white p-5">
            <div
              id="p-text-editor"
              style={{
                margin: '50px',
              }}
            >
              <JDHeader
                // companyName={companyName}
                setCompanyName={setCompanyName}
                // companyLogoUrl={companyLogoUrl}
                // companyLocation={companyLocation}
                setCompanyLogoUrl={setCompanyLogoUrl}
                setCompanyLocation={setCompanyLocation}
              />
              <h4 className="text-center mb-4">{jobTitle}</h4>

              {cards.length > 0 &&
                cards.map((section, i) => (
                  <>
                    <JdSections
                      onclick={ChangeDiv}
                      setCards={setCards}
                      cards={cards}
                      NEW={NEW}
                      index={i}
                      getRoleId={getRoleId}
                      generateCSV={generateCSV}
                      key={section.id + i}
                      section={section}
                      moveCard={moveCard}
                      showKeyWords={showKeyWords}
                      deleteSection={deleteSection}
                      moveSentenceCard={moveSentenceCard}
                      deleteSectionRow={deleteSectionRow}
                      createSectionRow={createSectionRow}
                      sliceReleatedSentences={sliceReleatedSentences}
                      selectedKeywords={selectedKeywords}
                    />
                  </>
                ))}
            </div>
          </MainContainer>
          {/* <button onClick={Pdf}>Print</button> */}
        </div>
      </div>
    </DndProvider>
  );
};

export default Editor;
