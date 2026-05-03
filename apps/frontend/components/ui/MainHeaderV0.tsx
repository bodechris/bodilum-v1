import { useEffect } from 'react';
import styled from 'styled-components';

import Link from 'next/link';
import { useGlobalAppStates } from '@bod/utils/contexts/GlobalAppVarProvider';

function MainHeaderV0() {
  const { isSignedIn } = useGlobalAppStates();

  useEffect(() => {
    console.log("MainHeaderV0 - isSignedIn:", isSignedIn);
  }, [isSignedIn]);


  return (
    <MainHeaderV0Wrapper>
        <div className="w-[95%] flex justify-between header-holder">
            <div className="_left"><Link href="/">Logo</Link></div>
            <div className="_center">
                <nav>
                    <ul className="flex gap-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        {/* <li><Link href="/inspirations">Inspirations</Link></li> */}
                        {/* <li><Link href="/projects">Projects</Link></li> */}
                        {/* <li><Link href="/start">Start</Link></li> */}
                        {/* <li><Link href="/brands">Brands</Link></li> */}
                        {/* <li><Link href="/pricing">Pricing</Link></li> */}  
                    </ul>
                </nav>
            </div>
            <div className="_right">
                {isSignedIn ? (
                    <Link href="/profile">Profile</Link>
                ) : (
                    <Link href="/signin">Sign in</Link>
                )}
            </div>
        </div>
    </MainHeaderV0Wrapper>
  )
}

export default MainHeaderV0;

const MainHeaderV0Wrapper = styled.header`
  margin: 0 auto;
  width: 100%;
  height: 60px;
//   background: skyblue;
  position: fixed;
  top: 0; left: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;

  .header-holder  {
    padding-top: 10px;

    ._left {}

    ._center {
      nav {
      width: auto;
      height: auto;
      padding: 1rem 2rem;
      border-radius: 1rem;
      background: #fff3;
      backdrop-filter: blur(10px);
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            a {
              text-decoration: none;
              color: #000;
              font-weight: bold;
              &:hover {
                color: #555;
                }
            }
          }
        }
      }
    }

    ._right {}
  }
`;