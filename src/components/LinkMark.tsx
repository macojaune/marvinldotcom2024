export default function LinkMark() {
  return (
    <svg
      className='link-mark'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      <path className='link-mark-left' d='M9 6H6v12h3' />
      <path className='link-mark-right' d='M15 6h3v12h-3' />
      <circle
        className='link-mark-center'
        cx='12'
        cy='12'
        r='0.9'
        fill='currentColor'
        stroke='none'
      />
    </svg>
  )
}
