import React, { useState } from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import LeftDirection from './icons/LeftDirection';
import RightDirection from './icons/RightDirection';
import styled from 'styled-components';
import { WEEK_NAMES } from '@/constants';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  const getHeader = () => {
    return (
      <HeaderWrappder className='header'>
        <IconWrapper onClick={() => setActiveDate(subMonths(activeDate, 1))}>
          <LeftDirection />
        </IconWrapper>
        <h2 className='currentMonth'>{format(activeDate, 'yyyy년 MM월')}</h2>
        <IconWrapper onClick={() => setActiveDate(addMonths(activeDate, 1))}>
          <RightDirection />
        </IconWrapper>
      </HeaderWrappder>
    );
  };

  const getWeekDaysNames = () => {
    return (
      <WeekNmaesWrapper>
        {WEEK_NAMES.map((day) => (
          <WeekNmaesContainer key={day}>{day}</WeekNmaesContainer>
        ))}
      </WeekNmaesWrapper>
    );
  };

  const generateDatesForCurrentWeek = (date: Date) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;

      if (getMonth(cloneDate) === getMonth(activeDate)) {
        week.push(
          <WeekDate
            onClick={() => {
              setSelectedDate(cloneDate);
            }}
          >
            {format(currentDate, 'd')}
          </WeekDate>
        );
      } else {
        week.push(<WeekDate />);
      }
      currentDate = addDays(currentDate, 1);
    }
    return <WeekContainer>{week}</WeekContainer>;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      /* allWeeks.push(generateDatesForCurrentWeek(currentDate)); */
      if (getMonth(currentDate) === getMonth(activeDate)) {
        allWeeks.push(
          <WeekDate
            onClick={() => {
              setSelectedDate(currentDate);
            }}
          >
            {format(currentDate, 'd')}
          </WeekDate>
        );
      } else {
        allWeeks.push(<WeekDate />);
      }
      currentDate = addDays(currentDate, 1);
    }

    return <WeekContainer>{allWeeks}</WeekContainer>;
  };

  return (
    <Wrapper>
      {getHeader()}
      <DateWrapper>
        {getWeekDaysNames()}
        {getDates()}
      </DateWrapper>
    </Wrapper>
  );
};

export default Calendar;

const Wrapper = styled.div`
  /* width: 810px; */
  width: 405px;
  height: 100%;
  padding: 46px;
`;

const HeaderWrappder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.background.gray};
  }
`;

const DateWrapper = styled.div`
  padding-top: 20px;
`;
const WeekNmaesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekNmaesContainer = styled.p`
  color: ${({ theme }) => theme.color.font.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const WeekContainer = styled.div`
  /* display: flex;
  flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekDate = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
