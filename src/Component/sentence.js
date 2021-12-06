import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

import { ItemTypes } from './item-types';

export const SentenceBox = styled.p`
  opacity: ${({ opacity }) => opacity};
  user-select: text;
  outline: none;
  -webkit-user-select: text;
  min-height: 25px;
  margin: 0px !important;
  &:active,
  &:hover {
    outline: 0.5px solid #ddd;
  }
  &:empty:not(:focus)::before {
    content: attr(data-placeholder);
    font-weight: 200px;
    color: #ccc;
  }

  ul {
    margin: 0px !important;
  }
`;

export const Sentence = ({
  NEW,
  sectionId,
  getRoleId,
  generateCSV,
  sentenceId,
  sectionIndex,
  divId,
  value, // actula HTML
  index,
  onKeyDown,
  moveSentenceCard,
  ...rest
}) => {
  // console.log(value);
  const ref = useRef(null);
  const valueRef = useRef(value);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.SENTENCE,
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
          moveSentenceCard(sectionIndex, dragIndex, hoverIndex);
        });
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SENTENCE,
    item: () => {
      // return { sectionId };
      return { sentenceId, index };
    },

    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));
  return (
    <>
      <SentenceBox
        {...rest}
        ref={ref}
        data-index={index}
        contentEditable={true}
        onKeyDown={e => {
          onKeyDown(e, ref.current);
        }}
        contentEditable={'true'}
        opacity={opacity}
        id={sentenceId}
        data-handler-id={handlerId}
        data-sentence-id={sentenceId}
        data-placeholder={'type here / select a keyword'}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: valueRef.current }}
      />
    </>
  );
};
