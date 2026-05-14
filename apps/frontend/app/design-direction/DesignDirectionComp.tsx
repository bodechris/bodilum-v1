import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

type DesignDirectionCompProps = PropsWithChildren<{}>;
function DesignDirectionComp(props: DesignDirectionCompProps) {
  return (
    <DesignDirectionCompWrapper>
        Design Direction
    </DesignDirectionCompWrapper>
  )
}

export default DesignDirectionComp;

const DesignDirectionCompWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;