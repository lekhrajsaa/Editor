import { nanoid } from 'nanoid';
import { htmlToJson } from './html-to-json';

export const createPublishJson = ({
  roleId,
  sections,
  keywords,
  sentences,
  companyName,
  companyLogoUrl,
  companyLocation,
}) => {
  return {
    role_id: roleId,
    sections,
    keywords,
    sentences,
    company: {
      description: '',
      name: companyName,
      logo_url: companyLogoUrl,
      location: companyLocation,
    },
  };
};

export const generateJson = _sections => {
  var sections = [];
  var sentences = [];
  var latestData = JSON.parse(JSON.stringify(_sections));

  _sections.map((obj, index) => {
    var divId = obj.id + '_content'; //obj.value.replace(/ /g, '').toLowerCase();
    var dom = document.getElementById(divId);
    var sectionId = obj.id;
    if (dom) {
      const sentencesCopy = createRowHelper(divId, sectionId, obj.sentences);
      latestData[index].sentences = sentencesCopy;
      sentences = [...sentences, ...sentencesCopy];

      const section = {
        id: obj.id,
        value: obj.value,
      };
      sections.push(section);
    }
  });

  return { sections, sentences, latestData };
};

export const getSelectedKeywords = data => {
  const keywords = [];
  data.map(_section => {
    const _keywords = _section['keywords'];
    const _selectedKeywords = _section['selectedKeywords'];
    if (Array.isArray(_keywords) && _keywords.length > 0) {
      _keywords.map(_k => {
        if (_selectedKeywords.indexOf(_k.id) > -1) {
          _k['keyword_id'] = _k.id;
          keywords.push(_k);
        }
      });
    }
  });
  return keywords;
};

export const createRowHelper = (divId, sectionId, sentences) => {
  let dom = document.getElementById(divId);
  let _sentences = [];
  if (dom) {
    let idx = 0;
    for (let child = dom.firstChild; child; child = child.nextSibling) {
      _sentences.push({
        section_id: sectionId,
        value: JSON.stringify(htmlToJson(child)),
        id: child.getAttribute('data-sentence-id'),
        keywords: (sentences[idx]?.keywords ? true : false) || [],
      });
      idx++;
    }
  }

  return _sentences;
};

export const modifyJDJson = json => {
  var _j = JSON.parse(JSON.stringify(json));
  // console.log(json, _j, 'red positive');
  _j['modifiedJson'] = [];

  _j.sections.map(section => {
    var sectionId = section.id;
    var sentences = _j.sentences.filter(
      sentence => sentence.section_id == sectionId
    );

    _j['modifiedJson'].push({
      sentences,
      id: sectionId,
      keywords: [],
      selectedKeywords: [],
      value: section.value,
    });
  });
  return _j;
};

const sortKeywords = (a, b) => {
  if (a.index < b.index) return -1;
  if (a.index > b.index) return 1;
  return 0;
};

export const addSentencesInCreateJd = (sections, jdKeywords) => {
  console.log(jdKeywords, 'Ankur ');
  var tempSections = [];
  sections.map((section, idx) => {
    let sectionKeywords = jdKeywords.filter(k => k.section_id === section.id);
    // console.log(sectionKeywords, 'Mithelish');
    let NewkeywordSentences = sectionKeywords
      .map(k => {
        if (Array.isArray(k.sentences)) {
          // sentences getting
          let sent = k.sentences[0];
          if (sent.indexOf(k.name) != -1) {
            return {
              text: sent,
              match: sent.indexOf(k.name),
              find: k.name,
              id: k.id,
            };
          }
          return {
            text: sent,
            find: false,
          };
        } else
          return {
            text: '',
            find: false,
          };
      })
      .filter(s => s.text)
      .slice(0, 3);
    console.log(NewkeywordSentences, 'Mithelish');
    // {"name":"class","value":"center"}
    // console.log(NewkeywordSentences, 'All js');
    let keywordSentences = NewkeywordSentences.map(sentence => {
      let t;

      if (sentence?.match) {
        t =
          '{"tagName":"P","attributes":[{"name":"class",' +
          `"value":  "${sentence.id}"}]` +
          ',"children":[ ' +
          `"${sentence.text.substr(0, sentence.match)}"` +
          ',{"tagName" : "B", "attributes":[{"name":"class","value":""}],"children" :' +
          `["${sentence.find}"]}` +
          `,{"tagName" : "L", "attributes":[{"name":"class","value":""}],"children":["${sentence.text.substr(
            sentence.match + sentence.find.length,
            sentence.text.length - sentence.match
          )}"]}` +
          //  +
          ']}';
      } else {
        t =
          '{"tagName":"P","attributes":[{"name":"class",' +
          `"value":  ""}]` +
          ',"children":[ ' +
          `"${sentence.text}"` +
          ']}';
      }

      // console.log(JSON.parse(t), 'NEW DATA');

      return t;
    });

    // console.log(keywordSentences, 'All js');
    // let keywordSentences = []
    keywordSentences.push('{"tagName":"P","attributes":[],"children":[""]}');
    tempSections.push({
      id: section.id,
      value: section.value,
      keywords: [],
      selectedKeywords: [],
      sentences: keywordSentences.map(sentence => {
        return {
          id: nanoid(30),
          section_id: section.id,
          idx: idx,
          value: sentence,
        };
      }),
    });
  });
  return tempSections;
};

export function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export function removeElements(tagName, node) {
  var element = document.getElementsByTagName(tagName),
    index;

  for (index = element.length - 1; index >= 0; index--) {
    node.parentNode.removeChild(element[index]);
  }
}

export function copyToClipboard(value) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(value);
}
