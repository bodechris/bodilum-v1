'use client'

import { usePathname, useParams, useSearchParams } from "next/navigation";


export function useGetPathName() { 
  let pathname = usePathname();
  return pathname;
}

export function useGetPathNameArr() {
  let pathname = usePathname();
  const pathArr = getPathNameArr( pathname ); 
  return pathArr.filter((v: string) => v.trim() !== "" );
}

export function usePathParams() {
  const params = useParams();
  // console.log("Params: ", params);
  return params;
}
export function usePathQueryParams() {
  const queryParams = useSearchParams();
  // console.log("Query Params: ", queryParams);
  return queryParams;
}

// convert a path name to array 
const getPathNameArr = ( pathname: string ) => {
  let pathArr = pathname.split('/'); 
  pathArr.shift();
  return pathArr;
}



