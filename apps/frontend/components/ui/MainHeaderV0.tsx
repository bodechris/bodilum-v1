"use client";

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from './styles/main-header.module.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalAppStates } from '@bod/utils/contexts/GlobalAppVarProvider';
import useWindowResize from '@bod/utils/hooks/useWindowResize';

import { Popover, Portal } from "@chakra-ui/react";



function MainHeaderV0() {
  const { isSignedIn } = useGlobalAppStates();

  const [open, setOpen] = useState(false)
  const pathname = usePathname();
  const screenDim = useWindowResize();
  const useCompactLogo = screenDim[0] > 0 && screenDim[0] < 768;

  useEffect(() => {
    console.log("MainHeaderV0 - isSignedIn:", isSignedIn);
  }, [isSignedIn]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // useEffect(() => {
  //   console.log("MainHeaderV0 - screenDim:", screenDim);
  // }, [screenDim]);

  const logoSvg = {
    icon: <svg fill="none" ><path fillRule="evenodd" clipRule="evenodd" d="M27.5 0C42.688 0 55 12.312 55 27.5S42.688 55 27.5 55 0 42.688 0 27.5 12.312 0 27.5 0Zm.985 9.153c10.126.48 17.946 9.077 17.467 19.203-.48 10.126-9.077 17.946-19.203 17.466-8.503-.402-15.38-6.53-17.081-14.48-.674-2.76-.989-6.131-.818-9.75.433-9.137 3.799-16.4 7.517-16.225 1.853.088 3.444 2.006 4.52 5.04a18.292 18.292 0 0 1 7.598-1.254Zm-.561 11.863a6.48 6.48 0 1 1-.613 12.944 6.48 6.48 0 0 1 .613-12.944Z" fill="#222"/></svg>,
    icon_and_text: <svg viewBox="0 0 1302.35 226.78" className="icon_and_text" fill="none">
    <path d="M115.13,86.65c14.74.7,26.12,13.21,25.42,27.95-.7,14.74-13.21,26.12-27.95,25.42-14.74-.7-26.12-13.21-25.42-27.95.7-14.74,13.21-26.12,27.95-25.42M117.45,37.74c41.75,1.98,73.99,37.42,72.02,79.18-1.98,41.75-37.42,73.99-79.18,72.02-35.06-1.66-63.41-26.92-70.43-59.7-2.77-11.39-4.07-25.29-3.37-40.21,1.78-37.67,15.66-67.62,31-66.9,7.64.36,14.2,8.27,18.64,20.77,9.67-3.81,20.27-5.69,31.33-5.16M113.39,0c62.62,0,113.39,50.77,113.39,113.39s-50.77,113.39-113.39,113.39S0,176.01,0,113.39,50.77,0,113.39,0"/>
    <g stroke='#222' strokeWidth={10}>
      <path d="M1278.98,79c-21.58-15.74-49.88-13.45-69.46,5.01-17.29-16.46-41.53-19.94-62.19-9.38-19.12,9.78-30.36,29.08-30.57,50.66l.17,66.33c.02,8.14,7.87,14.03,14.96,13.87,6.37-.14,14.35-5.58,14.41-13.45l.59-70.12c.12-14.02,12.75-24.9,26.41-23.74,11.94,1.01,21.26,11.31,21.34,23.51l.47,70.78c.05,7.75,8.39,13.19,14.63,13.11,6.65-.08,14.37-5.67,14.44-13.55l.63-71.88c.11-12.05,10.38-21.26,21.51-21.97,13.39-.85,25.78,9.76,25.92,23.54l.71,71.14c.08,7.62,8.61,12.8,14.76,12.7,6.48-.11,14.34-5.77,14.37-13.56l.27-67.89c-.76-18.21-8.82-34.5-23.37-45.11Z"/>
      <path d="M749.77,20.48c-7.1-.29-15.06,5.34-15.14,13.6l-.4,43.66c-25.32-18.48-57.5-19.44-82.98-2.22-19.59,13.24-32.15,34.24-32.21,59.09-.06,27.84,16.24,51.53,38.46,63.15,24.63,12.88,53.98,10.92,75.81-5.22,18.38-13.58,30.53-34.31,30.57-57.33l.17-100.12c.01-8.44-6.75-14.32-14.28-14.63ZM691.17,176.83c-23.24,0-42.08-18.84-42.08-42.08s18.84-42.08,42.08-42.08,42.08,18.84,42.08,42.08-18.84,42.08-42.08,42.08Z"/>
      <path d="M415.6,79.33c-25-20.21-60.48-22.05-88.24-1.51l-.24-43.76c-.04-8.26-7.93-13.89-15.02-13.66-7.59.25-14.53,6.22-14.52,14.7l.08,98.86c.02,22.81,10.88,43.24,28.8,57.17,21.35,16.59,49.95,19.97,75.43,7.83,21.6-10.29,38.37-32.65,40.35-59.46,1.8-24.34-9.49-46.29-26.65-60.17ZM370.31,176.88c-23.28,0-42.14-18.87-42.14-42.14s18.87-42.14,42.14-42.14,42.14,18.87,42.14,42.14-18.87,42.14-42.14,42.14Z"/>
      <path d="M530.3,63.32c-39.48,0-71.48,32-71.48,71.48s32,71.48,71.48,71.48,71.48-32,71.48-71.48-32-71.48-71.48-71.48ZM530.22,176.79c-23.21,0-42.03-18.82-42.03-42.03s18.82-42.03,42.03-42.03,42.03,18.82,42.03,42.03-18.82,42.03-42.03,42.03Z"/>
      <path d="M1069.04,68.42c-8.04.19-14.28,6.37-14.48,15.5-.39,18.57.74,35.91-.58,53.59-1.74,23.37-22.32,40.01-44.51,39.26-21.72-.73-41.12-18.66-41.25-41.47l-.29-52.02c-.05-8.81-7.25-15.29-15.3-14.82-7.48.44-14.13,6.51-14.09,14.91l.28,54.32c.2,39.16,34.99,68.9,73.04,68.49,37.92-.41,69.75-29.66,71.97-68.78,1.03-18.08.24-35.82.31-54.12.04-8.8-7.55-15.05-15.11-14.87Z"/>
      <path d="M886.06,20.49c-8.38.69-13.83,7.03-13.83,15.93l.05,154.36c0,8.73,7.64,14.59,14.89,14.57,7.54-.02,14.78-5.7,14.78-15.16V34.68c.01-8.97-8.59-14.8-15.89-14.19Z"/>
      <path d="M818.07,77.44c-7.97.59-13.99,6.65-13.98,15.3l.09,98.08c0,8.43,7.34,14.38,14.85,14.52,6.65.12,14.89-5.35,14.89-14.22v-99.22c.01-9.13-8.16-15.03-15.85-14.46Z"/>
      <path d="M819.12,26.42c-8.43,0-15.27,6.83-15.27,15.27s6.83,15.27,15.27,15.27,15.27-6.83,15.27-15.27-6.83-15.27-15.27-15.27Z"/>
    </g>
</svg>
  } as const;


  return (
    <>
    <MainHeaderV0Wrapper>
      <div className={`${styles.mainHeader} w-[95%] flex justify-between header-holder`}>
            <div className="_left">
              <Link href="/">{ useCompactLogo ? logoSvg.icon : logoSvg.icon_and_text }</Link>
              {/* <Link href="/">{ logoSvg.icon }</Link> */}
            </div>
            <div className="_center">
                <nav>
                    <ul className="flex gap-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/design-direction">Design Direction</Link></li>
                        <li><Link href="/monthly-support">Monthly Support</Link></li>
                        <li>
                          <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                            <Popover.Trigger asChild>
                              <button className="btn-1">Services</button>
                            </Popover.Trigger>
                            <Portal>
                              <Popover.Positioner>
                                <Popover.Content className={ styles.popoverContent }>
                                  <Popover.Arrow />
                                  <Popover.Body className={ styles.popoverBody }>
                                    <ul className={ styles.popoverList }>
                                      <li><Link href="/services/design">Design</Link></li>
                                      <li><Link href="/services/web-development">Web Development</Link></li>
                                      <li><Link href="/services/ai-integrations">AI Integrations</Link></li>
                                    </ul>
                                  </Popover.Body>
                                </Popover.Content>
                              </Popover.Positioner>
                            </Portal>
                          </Popover.Root>
                        </li>
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
                    // <Link href="/signin">Sign in</Link>
                    <></>
                )}
            </div>
        </div>
    </MainHeaderV0Wrapper>
    </>
  )
}

export default MainHeaderV0;

const MainHeaderV0Wrapper = styled.header`
  margin: 0 auto;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0; left: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;

  .header-holder  {
    padding-top: 15px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;

    ._left {
      width: 60px;
      height: 60px;
      top: 0; left: 0;
      position: absolute;
      z-index: 15;

      // border: 2px solid pink;

      svg {
        width: 100%;
        height: auto;
        fill: #222;
        fill-rule: evenodd;
      }

      svg.icon_and_text {
        width: min(200px, 30vw);
      }
    }

    ._center {
      display: flex;
      width: 100%;
      height: auto;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0; left: 100px;

      z-index: 10;

      nav {
      width: auto;
      height: auto;
      padding: 1rem 2rem;
      border-radius: 1rem;
      background: #fff3;
      backdrop-filter: blur(10px);
      

      -webkit-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
      -moz-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
      -ms-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);

      -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
      -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0.05);
      box-shadow:         0px 20px 30px 2px rgba(0,0,0,0.05); 

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          li {
            position: relative;
            .btn-1 {
              appearance: none;
              background: transparent;
              border: 0;
              color: #000;
              cursor: pointer;
              font: inherit;
              font-weight: bold;
              line-height: 0.7 !important;
              position: relative;
              padding: 0;

              &:hover {
                color: #555;
              }

              &:focus-visible {
                outline: 2px solid #222;
                outline-offset: 0.35rem;
                border-radius: 0.25rem;
              }
            }

            a {
              text-decoration: none;
              color: #000;
              font-weight: bold;
              line-height: 0.7 !important;
              position: relative;
              &:hover {
                color: #555;
                }
            }
          }
        }
      }
    }

    ._right {
      top: 0; right: 0;
      position: absolute;
      z-index: 15;
    }

    @media all and (min-width: 768px) {

      .header-holder  {
        top: 20px;
      }

      ._left {
        top: 0; left: 0;
        width: 200px;
      }
      ._center {
        left: 0;
      }
    }
  }
`;