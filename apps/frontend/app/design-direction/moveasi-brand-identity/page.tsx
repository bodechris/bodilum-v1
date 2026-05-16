import React from 'react';
import DesignDirectionComp from '../DesignDirectionComp';
import { DesignDirectionDataType, designDirectionData as designData } from '../designDirectionData';

function page() {
  return (
    <DesignDirectionComp {...(designData[3] as DesignDirectionDataType)} />
  )
}

export default page;