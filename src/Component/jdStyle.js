import styled, { css } from 'styled-components';

const MainContainer = styled.div`
  margin: 3.4rem 4.5rem;
  min-height: 100vh;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(135, 169, 204, 0.25);
`;

const SecondNavWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 0.95rem;
  padding-bottom: 0.95rem;
`;
const SecondHeading = styled.h5`
  font-size: 20px;
  font-weight: 400;
  small {
    color: #7d8b96;
    font-size: 12px;
    font-weight: 100;
  }
`;
const LastTabs = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.colorE6E6FA};
  border-bottom: 1px solid ${({ theme }) => theme.colors.colorE6E6FA};
  background-color: ${({ theme }) => theme.colors.white};
`;
const JobCardWrapper = styled.div``;
const JobCardPopOver = styled.div`
  // display: none;
  position: absolute;
  z-index: 1;
  right: -65px;
  top: 28px;
  background-color: white;
  border-radius: 8px;
  width: 140px;
  box-shadow: 0px 0px 5px rgba(215, 233, 252, 0.75);
  ul {
    padding: 15px 20px 10px;
    margin: 0;
    li {
      text-align: left;
      cursor: pointer;
      list-style: none;
      padding-bottom: 6px;
    }
  }
`;
const JobCard = styled.div`
  min-height: 176px;
  border-radius: 8px 8px 0 0;
`;
const JobCardTitle = styled.div`
  font-size: 18px;
  color: #333333;
  padding-top: 8px;
`;
const JobCardBottom = styled.div`
  color: #7d8b96;
  background-color: #fefcfc;
  border-radius: 0 0 8px 8px;

  div {
    font-size: 15px;
  }
  small {
    font-size: 13px;
  }
`;

const Pill = styled.span`
  background: #e2f3e3;
  border-radius: 50px;
  color: #43a047;
  padding: 0.3rem 0.7rem;
  font-size: 13px;
`;

/**
 *
 * JD create styles
 *
 */
const TextEditorButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e6e6fa;
  background-color: white;
`;

const TextEditorButtons = styled.div`
  cursor: pointer;
  padding: 8px 14.5px;
  border-bottom: 1px solid #e6e6fa;

  &.add-section {
    font-size: 12px;
    color: #7d8b96;
    background-color: #f5faff;
    border: 1px solid #e6e6fa;
  }

  &.templates {
    font-size: 13px;
    color: #424242;
    border: 1px solid #e6e6fa;
  }
`;

const CompayDetails = styled.div`
  font-size: 20px;
  font-weight: 300;
  outline: none;
  &.comp-location {
    font-size: 16px;
  }
  &:empty:not(:focus)::before {
    content: attr(data-placeholder);
    color: #d0d0d0;
  }
`;

const EditorSection = styled.section`
  width: 100%;
  padding-top: 10px;
  margin-bottom: 2.2rem;
  position: relative;
  color: ${({ theme }) => theme.colors.color333333};
  // margin-left: 10%;
  &.editor {
    min-height: 100px;
  }

  .drag-icon {
    cursor: move;
  }

  h5 {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.color333333};
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin: 0 0 1rem 0;
    padding: 0.3rem 1rem;

    ul,
    ol {
      padding: 10px 0 0 16px;
    }
  }

  em {
    position: absolute;
    right: 0px;
    top: 0;
  }
`;

const SkillSection = styled.p`
  button {
    color: #333;
    font-size: 13px;
    padding: 0.3rem 1.2rem;
    border: 1px solid #f4f7fa;
    background-color: #f4f7fa;

    &.selected {
      color: #f4f7fa;
      background-color: #333333;
    }

    :focus,
    :active {
      outline: none !important;
      box-shadow: none;
    }
  }
`;

const TransparentButton = styled.button`
  background: transparent;
  color: #000;
  border: none;
  margin: 0px;
  padding: 5px;
`;

const RefreshButton = styled.button`
  background: transparent;
  color: #000;
  border: 1px solid;
  margin: 0px;
  padding: 5px;
  border-radius: 5px;
`;

const KeywordPill = styled.div`
  display: inline-block;
  padding: 0px 7px;
  margin: 5px 10px;
  border-radius: 5px;
  color: #4045ff;
  border: 1px solid #4045ff;
`;

/**
 *
 * JD Overview styles
 *
 */

const OverviewTable = styled.table`
  tr {
    &.head {
      background-color: #f4f7fa;
      color: #aaa;
      th {
        font-size: 12px;
        font-weight: normal;
        padding: 12px;
      }
    }

    td {
      color: #333;
      font-size: 14px;
      vertical-align: inherit;
    }
  }
`;

const CompanyList = styled.ul`
  li {
    background-color: #f6f6f6;

    span {
      color: #333333;
      font-size: 18px;
      font-weight: bold;
      background-color: transparent;
    }
  }
`;

/**
 * Auto complete
 */

export const Root = styled.div`
  position: relative;
  width: 320px;
`;

export const baseButtonMixin = css`
  background: none;
  border: none;
  padding: 0;
`;

export const ValueWrapper = styled.input`
  width: 100%;
  padding-left: 8px;
  padding-right: 32px;
  height: 32px;
  box-sizing: border-box;
  border-radius: 1px;
  border: 1px solid #b6c1ce;
  line-height: 32px;
`;

export const AutoCompleteContainer = styled.ul`
  left: 0;
  margin: 0;
  top: 100%;
  z-index: 1;
  padding: 8px 0;
  overflow-y: auto;
  min-width: 507px;
  background: #fff;
  max-height: 280px;
  position: absolute;
  border-radius: 2px;
  list-style-type: none;
  box-sizing: border-box;
  border: 1px solid #b6c1ce;
`;

export const AutoCompleteItem = styled.li`
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
  button {
    color: rgb(125, 139, 150);
  }
  &:hover {
    background-color: #ebf4ff;
  }
`;

export const AutoCompleteItemButton = styled.button`
  ${baseButtonMixin} width: 100%;
  line-height: 32px;
  text-align: left;
  &:active {
    outline: none;
    color: #0076f5;
  }
`;
export const Input = styled(ValueWrapper)`
  transition: border-color 150ms linear;

  &:focus {
    border-color: #0063cc;
    outline: none;
  }
`;

export {
  Pill,
  JobCard,
  SkillSection,
  TransparentButton,
  RefreshButton,
  KeywordPill,
  LastTabs,
  JobCardTitle,
  JobCardBottom,
  SecondHeading,
  JobCardWrapper,
  CompanyList,
  SecondNavWrapper,
  JobCardPopOver,
  EditorSection,
  OverviewTable,
  CompayDetails,
  TextEditorButtons,
  MainContainer,
  TextEditorButtonsWrapper,
};
