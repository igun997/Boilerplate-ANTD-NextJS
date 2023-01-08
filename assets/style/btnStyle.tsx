import { Simulate } from 'react-dom/test-utils';

const btnStyle = {
  borderRadius: '5rem',
  height: '4rem',
};

const btnLabel = {
  display: 'flex',
  background: 'linear-gradient(90deg,#55c48b,#01849f)',
  width: 50,
  minWidth: 50,
  height: 145,
  marginTop: -48,
  marginLeft:'-2rem',
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: '1rem',
  borderBottomRightRadius:'2rem',
  borderBottomLeftRadius:'.5rem'
}

const btnLevel = {
  display: 'flex',
  background: 'linear-gradient(90deg, #ffc107, #ff9800)',
  width: 50,
  boxShadow:'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  minWidth: 50,
  height: 45,
  marginTop: -48,
  right:'0px',
  left:'auto',
  marginRight:10,
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: '1rem',
  borderBottomRightRadius:'.5rem',
  borderBottomLeftRadius:'2rem',
}

export {
  btnStyle,
  btnLabel,
  btnLevel
};
