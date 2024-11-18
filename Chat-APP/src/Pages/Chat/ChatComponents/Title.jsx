import React from 'react'

function Title({text}) {
  return (
    <div className=''>
    <h6 className='uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>
        {text}
    </h6>
    </div>
  )
}

export default Title