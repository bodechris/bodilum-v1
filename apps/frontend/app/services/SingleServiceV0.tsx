import React from 'react';
import styled from 'styled-components';
import { SingleServiceProp } from './ServiceSectionPage';
import Link from 'next/link';

function SingleServiceV0({ title, description, link }: SingleServiceProp) {
  return (
    <SingleServiceV0Wrapper>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href={link}>Learn More</Link>
    </SingleServiceV0Wrapper>
  )
}

export default SingleServiceV0;

const SingleServiceV0Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #eee;
  border-radius: 20px;
  padding: 1rem;

    -webkit-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    -moz-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    -ms-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
    transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);

    -webkit-box-shadow: 0px 20px 30px 2px rgba(0,0,0,0.05);
    -moz-box-shadow:    0px 20px 30px 2px rgba(0,0,0,0.05);
    box-shadow:         0px 20px 30px 2px rgba(0,0,0,0.05); 
`;