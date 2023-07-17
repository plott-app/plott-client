import { useState } from 'react';
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6';
import { styled } from 'styled-components';

const DateNavWrapper = styled.div`
  width: 50vw;
`;

const DateNav = () => {
  // TODO: locale 설정 가져오기 / 설정하기
  const [date, setDate] = useState(new Date());

  const today = date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  const goNextDate = () => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setDate(prev.getDate() + 1);
      return date;
    });
  };

  const backPrevDate = () => {
    setDate((prev) => {
      const date = new Date(prev);
      date.setDate(prev.getDate() - 1);
      return date;
    });
  };

  return (
    <div className="w-70 flex j-between i-center mx-auto">
      <FaBackwardStep onClick={backPrevDate} />
      <h3>{today}</h3>
      <FaForwardStep onClick={goNextDate} />
    </div>
  );
};

export default DateNav;
