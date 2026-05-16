import React from 'react';
import DesignDirectionComp from '../DesignDirectionComp';
import { DesignDirectionDataType, designDirectionData as designData } from '../designDirectionData';

function page() {
  return (
    <DesignDirectionComp {...(designData[2] as DesignDirectionDataType)} />
  )
}

export default page;