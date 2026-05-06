'use client'

import React, { useEffect } from "react";
import styled from "styled-components";

import { Button, CloseButton, Dialog, For, HStack, Portal } from "@chakra-ui/react";
import { useGlobalAppStates } from "@bod/utils/contexts/GlobalAppVarProvider";
import Link from "next/link";

function HomePageComp() {

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean | undefined>(undefined);
  const [formType, setFormType] = React.useState<'waiting-list' | 'design-request'>('waiting-list');

  const { isSignedIn } = useGlobalAppStates() || {};

  useEffect(() => {
    if( !modalIsOpen ) return;
  }, [modalIsOpen]);

  // “On-demand branding & web design powered by AI, directed by humans.”


  return (
    <>
    <HomePageWrapper>
     <h1>
        Turn your <b>boldest</b> <span className="emp1">design ideas</span> into reality <b>in hours</b> —not weeks.
     </h1>

     <div className="lara-chat-bot">
        <div id="lara-user-input" contentEditable="true" role="textbox" aria-multiline="true" aria-label="Editable description area" aria-placeholder="Describe your design idea..." className="relative min-h-[120px] w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:content-[attr(aria-placeholder)] empty:before:text-gray-400 empty:before:absolute empty:before:left-3 empty:before:top-3 empty:before:cursor-text" onClick={ () => (setFormType('design-request'), setModalIsOpen(true)) }>
        </div>
        <span>Lara, our design AI-powered project manager, uses AI to help you refine your design brief using AI powered pre-made designs, uploaded references, and your initial design brief. It then manages the communication with our world-class design talents to execute your ideas in hours, not weeks!</span>
     </div>

    </HomePageWrapper>
    <Dialog.Root key="modal-form" size="lg" open={modalIsOpen} onOpenChange={(open) => setModalIsOpen(open.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {/* { formType === 'waiting-list' ? 'Join our Waiting List' : 'Request a Design' } */}
                <p className="text-2xl font-bold">This feature is launching soon 🚀</p>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {/* <>Dialog Body Content here...</> */}
              <p className="text-lg">We are working hard to launch this feature in the next few weeks. Stay tuned!</p>
              <div className="ctas" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center', justifyContent: 'center', textAlign: 'center', lineHeight: 1.0 }}>

                <Link href="/services/design" className="inline-block rounded-full border border-[#ccc] mt-2! bg-[#222] px-4! py-2! font-extrabold! text-[#ccc]! transition hover:border-[#222] hover:bg-[#000] hover:text-[#f7f7f7]!">See our design services</Link>
                <Link href="/services/development" className="inline-block rounded-full border border-[#ccc] mt-2! bg-[#222] px-4! py-2! font-extrabold! text-[#ccc]! transition hover:border-[#222] hover:bg-[#000] hover:text-[#f7f7f7]!">See our software engineering services</Link>
                <Link href="/services/ai-integrations" className="inline-block rounded-full border border-[#ccc] mt-2! bg-[#222] px-4! py-2! font-extrabold! text-[#ccc]! transition hover:border-[#222] hover:bg-[#000] hover:text-[#f7f7f7]!">See our AI Integration services</Link>

              </div>
            </Dialog.Body>
            <Dialog.Footer>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    </>
  )
}

export default HomePageComp;

const HomePageWrapper = styled.div`
  width: min(1200px, 90%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 10rem;

    h1 {
      margin-top: 15rem;
      text-align: center;
      font-size: clamp(2.0rem, 5vw, 3.5rem);
      line-height: 1.2;
    }

    h1 .emp1 {
        display: block;
        text-transform: capitalize;
        font-weight: bolder;
        font-size: clamp(3.5rem, 15vw, 10rem);
        letter-spacing: -1px;
        line-height: 0.8;
    }
    h2{
        display: block;
        text-transform: capitalize;
        font-weight: bolder;
        font-size: clamp(1.5rem, 4vw, 2rem);
        letter-spacing: -1px;
        line-height: 0.8;
    }
    h3{
        display: block;
        text-transform: capitalize;
        font-weight: bolder;
        font-size: clamp(1rem, 3vw, 1.5rem);
        letter-spacing: 1px;
        line-height: 0.8;
    }

    p {
        width: min(620px, 90%);
        font-size: clamp(12px, 2.5vw, 20px);
        line-height: 1.2;
        text-align: center;
        color: #555;
    }

    .small-info {
        font-size: clamp(12px, 2vw, 16px);
        margin-top: -1rem;
        margin-bottom: 2rem;
        color: #999;
      }

    @media all and (min-width: 1024px) {
        h1 {
            margin-top: clamp(5rem, calc(15vw + 2rem), 15rem);            
            line-height: 1.4;
        }
        h1 .emp1 {
            letter-spacing: -10px;
            line-height: 0.8;
        }
    }

  .lara-chat-bot {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    #lara-user-input {      
      width: min(650px, 90%);
      height: auto;
      min-height: 100px;
      max-height: 400px;
      padding: 25px;
      border-radius: 20px;
      font-size: 1rem;
      border: 0.5px solid #f0f0f0;
      resize: vertical;
      background: #fff;

      color: #777;

        -webkit-box-shadow: 10px 50px 30px 2px rgba(0,0,0,0.1);
        -moz-box-shadow:    10px 50px 30px 2px rgba(0,0,0,0.1);
        box-shadow:         10px 50px 30px 2px rgba(0,0,0,0.1); 

        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        -o-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }
    span {
        text-align: center;
        line-height: 0.8;
        color: #ccc;
        width: min(500px, 90%);
        font-size: clamp(8px, 1.5vw, 10px);
      }
   }
`;