import { useState, useEffect } from "react";


// export default function useNetwork() {
//     const [networkStatus, setNetworkStatus] = useState( false );
//     const config = {
//         timeout: 2000,
//         interval: 1000,
//       };

//       // networkStatus
//       useEffect(() => {
//         // console.log( 'Network Status from useEffect: ', networkStatus );
//       }, [ networkStatus ]);


//       useNetworkStatus((networkStatusUpdate) => {
//         // console.log( 'Network Status from custom hook: ', networkStatusUpdate );
//         setNetworkStatus( networkStatusUpdate );
//     }, config);

//     return networkStatus;

// }



const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine); 

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useNetwork;
