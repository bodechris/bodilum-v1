import React from 'react'
import styled from 'styled-components';

function BxPanelV0() {
  return (
    <BxPanelWrapper>
        <div className="bg-holder">
            <div className="img-itm">
                <img src="/images/xpo-office-5.png" alt="bx-panel-bg-1" className="w-full h-full object-cover object-center" />
            </div>
            <div className="img-itm">
                <img src="/images/get-started-cover-1.jpg" alt="bx-panel-bg-2" className="w-full h-full object-cover object-center" />
            </div>
            {/* <div className="img-itm">
                <img src="/images/xpo-office-8.jpg" alt="bx-panel-bg-3" className="w-full h-full object-cover object-center" />
            </div> */}
            <div className="img-itm">
                <img src="/images/create-a-brand-4.jpg" alt="bx-panel-bg-4" className="w-full h-full object-cover object-center" />
            </div>
            <div className="img-itm">
                <img src="/images/xpo-office-12.jpg" alt="bx-panel-bg-5" className="w-full h-full object-cover object-center" />
            </div>
            <div className="img-itm">
                <img src="/images/11-dash-branding-mockup-b.jpg" alt="bx-panel-bg-6" className="w-full h-full object-cover object-center" />
            </div>
        </div>
        <div className="content-holder">
            <h2>Our flagship AI-powered platform for solopreneurs and small businesses <br /><b>just launched!</b></h2>
            <h3>Create branded invoices, quotes, logos, business cards, receipts, and more just by chatting with a dedicated AI assistant - Lola, in minutes.</h3>
            <a href="https://biznesxpo.com" target="_blank">Try it now</a>
        </div>
    </BxPanelWrapper>
  )
}

export default BxPanelV0;

const BxPanelWrapper = styled.div`
  width: 95%;
  height: max(300px, 60vh);
  border: 0.5px solid #f7f7f7;
  position: relative;
  background: #fff;
  border-radius: 20px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

    -webkit-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    -moz-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    -ms-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);

    -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
    -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0.05);
    box-shadow:         0px 20px 30px 2px rgba(0,0,0,0.05); 


    .bg-holder {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .img-itm {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
            }
        }
    }

    .content-holder {
        position: relative;
        width: min(600px, 90%);
        height: auto;
        // background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.82));
        // border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        padding: 2.5rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        border-radius: 20px;
        overflow: hidden;
        isolation: isolate;

        -webkit-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
        -moz-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
        -ms-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
        transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);

        -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
        -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0.05);
        box-shadow:         0px 20px 30px 2px rgba(0,0,0,0.05); 

        &::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.64));
        }

        @supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
            &::before {
                backdrop-filter: blur(24px);
                -webkit-backdrop-filter: blur(24px);
            }
        }

        h2 {
            font-size: clamp(1.5rem, 2.5vw, 2.5rem);
            margin-bottom: 1rem;
            line-height: 1.2;
            color: #171717;

            b {
                color: #111;
            }
        }

        h3 {
            color: #3f3f46;
            line-height: 1.45;
        }

        a {
            margin-top: 1.5rem;
            padding: 0.8rem 2rem;
            background: #222;
            color: #f7f7f7;
            border-radius: 15px;
            font-weight: bold;
            text-decoration: none;

            -webkit-transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            -moz-transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            -ms-transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

            -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
            -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0.05);
            box-shadow:         0px 20px 30px 2px rgba(0,0,0,0.05); 

            &:hover {
                background: #000;
                color: #fff;
            }

        }
    }

`;