import React from 'react';
import App from '../App';
import main from '../assets/images/main-3.svg'
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo} from '../components'
import { Link } from 'react-router-dom';
export const Landing = () => {
  const imageClick = () => {

  } 
  return (
    <Wrapper>
      <nav>
         <Link to='/home'>
           <Logo />
        </Link>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>Job Seekers Must-Have</h1>
          <h4> Are you ready for job search?</h4>
            
          

          <Link to='/register' className='btn btn-hero'> Start your journey Now</Link>
        </div>
        <img src={main} alt = 'landing img' className='img main-img'>
        </img>
      </div>
    </Wrapper>
  )


};

export default Landing;
