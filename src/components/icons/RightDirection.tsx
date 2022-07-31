import { theme } from '@/styles/theme';

const RightDirection = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24px'
      height='24px'
      viewBox='0 0 48 48'
      fill='none'
    >
      <rect width='48' height='48' fill='white' fillOpacity='0.01' />
      <path
        d='M19 12L31 24L19 36'
        stroke={theme.color.font.black}
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default RightDirection;
