import React from 'react';
import {
  StyledIconDiagram,
  StyledSelect,
  WrapperDiagramTab,
} from './DiagramTab.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setMonth } from 'redux/SummaryPage/summarySlice';
import { selectMonth } from 'redux/SummaryPage/selectors';
import { SpriteSVG } from 'pictures/SpriteSVG';

export const DiagramTabMonthes = () => {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const dispatch = useDispatch();
  const month = useSelector(selectMonth);

  const newMonth = months => {
    const newMonth = months.find(el => el.value === month);
    return newMonth;
  };
  const handleMonthChange = selectedOption => {
    dispatch(setMonth(selectedOption.value));
  };

  return (
    <WrapperDiagramTab>
      <StyledSelect
        options={months}
        value={newMonth(months)}
        onChange={handleMonthChange}
        placeholder="Choose month"
        isSearchable={false}
        classNamePrefix="react-select"
        components={{
          DropdownIndicator: () => (
            <StyledIconDiagram>
              <SpriteSVG name={'select'} />
            </StyledIconDiagram>
          ),
        }}
      />
    </WrapperDiagramTab>
  );
};
