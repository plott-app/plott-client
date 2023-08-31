import { HiMenuAlt4 } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { DailyTodoType } from '../../atoms/todoAtom';
import IconImageHolder from '../UI/general/IconImageHolder';
import { Barmargin, ItemSize } from './CategoryComponents';

const Wrapper = styled.div`
  width: ${ItemSize};
  height: ${ItemSize};

  flex-grow: 1;
`;

const Barstyle = styled.span`
  top: ${Barmargin}rem;
  right: ${Barmargin}rem;
`;

const CategoryDashlist = ({
  todo_emoji,
  title,
  history_sum,
  category_name,
}: DailyTodoType) => {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() => navigate('/player')}
      className="round-md flex-column j-center i-center border-box hidden relative bg"
    >
      <Barstyle className="text-xs absolute">
        <HiMenuAlt4 />
      </Barstyle>

      <IconImageHolder size="2xl" isCircle={true} bg="white">
        {todo_emoji}
      </IconImageHolder>
      <div className="flex-column j-center i-center mt-sm">
        <span className="text-3xs">{category_name}</span>
        <h6>{history_sum}</h6>
      </div>
    </Wrapper>
  );
};

export default CategoryDashlist;
