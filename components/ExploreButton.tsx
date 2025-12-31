'use client';

const ExploreButton = () => {
  return (
  <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={()=>console.log('clicked')}>
    <a href="#events">
ExploreBtn
<img src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
    </a>
    </button>
  )
}

export default ExploreButton
