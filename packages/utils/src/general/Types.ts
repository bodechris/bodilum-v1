import { ReactNode, SetStateAction, Dispatch } from "react";

export type AuthUserType1 = {
    isSignedIn: boolean, 
    authUserVars: object, 
    userToken: string
}

export type AuthTypeType = 'signin' | 'signup' | 'reset-password' | 'recover-account';

////// BXFORMUIS TYPES //////
type TitlesType1 = {
    drop?: string,
    browse?: string
}
type OptionsType1 = {
    name: string,
    title: string
}

export type CustomInputAttributesType1 = { 
    type?: string,
    el_name?: string, 
    name?: string,
    title?: string,
    socials?: string[], 
    required?: boolean,
    align?: 'right' | 'center' | 'left' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly', 
    emailSubmit?: string, 
    authmode?: 'signin' | 'signup', 
    events?: string[],
    rules?: { [key: string]: string | boolean; },
    emailLabel?: string,
    hasLabel?: boolean
    placeholder?: string,
    showButton?: boolean,
    value?: string,
    btnType?: string,
    singleName?: string
    options?:  Record<string, any>[],
    maxNumSelection?: number,
    payload?: object,
    url?: string,
    "data-src"?: string,
    defaultErrMsg?: string,
    filetype?: string,
    titles?: TitlesType1
    settings?: object,
    setQueryFunc?: Function,
    setIsBusyFunc?: Function,
    setIsErrorFunc?: Function,
    setDataFunc?: Function,
    queryOpts?: object,
    userSelections?: any,
    setCurPage?: Function,
}

export type BxFormUiType = {
    errorMsg?: object,
    events?: string[],
    elements: CustomInputAttributesType1[], 
    settings?: string[],
    handleSubmit?: Function,
    setIsBusy?: Dispatch<SetStateAction<boolean>>,
    value?: string,
    validateEntry?: string
}

export type BxFormUiV2Type = {
    elements: CustomInputAttributesType1[], 
    setIsBusy?: Dispatch<SetStateAction<boolean>>,
    footer?: ReactNode,
    authtype?: AuthTypeType
}

export type FormFieldValidationResultType1 = {
    isValid: boolean,
    msg: string | object
  }


////// BXFORMUIS TYPES END //////


export type ReactIconType = {
    name: string, url: string
}



//////////// BAMockups ////////////////
export type BAMockupTypeV0 = {
    colors?: string[]
}
//////////// BAMockups Ends////////////////


/////////// BRAND STATE //////////////

export type FontsType1 = {
    names: string[],
    type: string[],
    src: string[]
  }


export type BrandStateTypeV0 = {
        
    colors?: string[],
    fonts?: FontsType1 | [],
    brandinfo?: {},
    team?: {}[],
    brandassets?: {}[]
  
}


export type MockupDesignTypeV0 = {
    colors?: string[],
    padding?: string,
    type?: string
  }


/////////// BRAND STATE ENDS //////////////


export type AppConfigType = {
    appName: string,
    authType: string,
    passwordLength: number,
    appIslive: boolean,
    otpValidDuration: number, // in minutes
    // launchMode: "pre-launch-jan-2025", // full, pre-launch-jan-2025
    launchMode: string, // full, pre-launch-jan-2025 
    apirouteprod: string,
    apiroutelocal: string,
    authrouteprod:  string,
    authroutelocal: string
} 



////////////// BRAND ASSET DESIGN TYPES //////////////
export type UserBrandAssetValueType = {
  id: string,
  name: string,
  category: string,
  design_id: string
}

export type UserBrandAssetsType = {
  logo?: UserBrandAssetValueType | null,
  bizCard?: UserBrandAssetValueType | null,
  letterhead?: UserBrandAssetValueType | null,
  flyer?: UserBrandAssetValueType | null,
  poster?: UserBrandAssetValueType | null,
  socialMediaPost?: UserBrandAssetValueType | null,
  socialMediaBanner?: UserBrandAssetValueType | null,
  cv?: UserBrandAssetValueType | null,
  resume?: UserBrandAssetValueType | null,
  invoice?: UserBrandAssetValueType | null,
  receipt?: UserBrandAssetValueType | null,
  quotation?: UserBrandAssetValueType | null,
  coverLetter?: UserBrandAssetValueType | null,
}

export type DAV0_AssetType = 'logo' | 'banner' | 'invoice' | 'quotation' | 'receipt' | 'profile-card' | 'business-card' | 'social-media-banner' | 'social-media-post' | 'poster' | 'flyer' | 'brochure' | 'letterhead' | 'email-signature' | 'digital-form' | 'brand-book' | 'id-card' | 'resume' | 'cv' | 'pricelist' | 'portfolio' | 'corporate-identity' | 'greeting-card' | 'corporate-presentation' | 'corporate-profile' | 'pitch-deck' | 'corporate-video' | 'page' | 'background';
export type DesignAssetTypeV0 = {
    assettype: DAV0_AssetType,
    designId: string, // Optional design ID for the asset
    colors: string[], // Array of colors in hex format
    fonts: Record<string, any>, // Object containing font details, e.g., { src: [], type: [], names: [] }
    designConfig?: Record<string, any>, // Optional user design configuration object
    assetData?: Record<string, any> // Optional asset data object for user data
}



////////////////// DISPLAY POST REACTION LIST V0 //////////////////
export type DisplayPostReactionType = 'all' | 'likes' | 'loves' | 'fantastics' | 'inspireds' | 'insightfuls';



////////////////////// BRAND COLORS //////////////////////

export type AccentColorType = {
  color: string,
  name: string
};

export interface IBrandPaletteV1 {
  ind: number,
  colors: string[],
  primary_color: string,
  primary_color_name: string,
  secondary_color: string,
  secondary_color_name: string,
  accent_colors: AccentColorType[],
  neutral_colors: AccentColorType[],
  mood: string[],
  brand_implications: string[],
  recommended_for: string[],
  short_description: string
}


export interface IBrandPalette {
  primary: string;       // Index 0
  secondary: string;     // Index 1
  accents: string[];     // The middle items (1 to 6 colors)
  neutrals: {            // The last two items
    primary: string;     // Index Length-2 (e.g., #f5f5f5)
    secondary: string;   // Index Length-1 (e.g., #333333)
  };
  // A helper getter to reconstruct the flat array for CSS loops
  fullPalette?: string[]; 
}



// {
//   "ind": 1,
//   "colors": [
//     "#7c7b89",
//     "#e5d9d5",
//     "#f4d75e",
//     "#e9723d",
//     "#0b7fab",
//     "#efefef",
//     "#d6d6d6",
//     "#f9f9f9",
//     "#282828"
//   ],
//   "primary_color": "#7c7b89",
//   "primary_color_name": "Muted Slate",
//   "secondary_color": "#e5d9d5",
//   "secondary_color_name": "Soft Cream",
//   "accent_colors": [
//     {
//       "color": "#f4d75e",
//       "name": "Sunny Yellow"
//     },
//     {
//       "color": "#e9723d",
//       "name": "Warm Tangerine"
//     },
//     {
//       "color": "#0b7fab",
//       "name": "Ocean Blue"
//     },
//     {
//       "color": "#efefef",
//       "name": "Light Gray"
//     },
//     {
//       "color": "#d6d6d6",
//       "name": "Silver Gray"
//     },
//     {
//       "color": "#f9f9f9",
//       "name": "Bright White"
//     }
//   ],
//   "neutral_colors": [
//     {
//       "color": "#f9f9f9",
//       "name": "Bright White"
//     },
//     {
//       "color": "#282828",
//       "name": "Charcoal"
//     }
//   ],
//   "mood": [
//     "balanced",
//     "warm",
//     "inviting",
//     "modern",
//     "calm",
//     "friendly"
//   ],
//   "brand_implications": [
//     "Conveys reliability with a modern edge",
//     "Invites warmth and approachability",
//     "Balances energetic accents with calm neutrals",
//     "Suitable for brands seeking trust and friendliness",
//     "Offers versatility across digital and print",
//     "Suggests creativity with professional stability"
//   ],
//   "recommended_for": [
//     "Lifestyle brands",
//     "Tech startups",
//     "Creative agencies",
//     "Wellness and health",
//     "Home decor",
//     "Educational platforms"
//   ],
//   "short_description": "Balanced Warmth: A muted slate primary with soft cream secondary, vibrant yellow and tangerine accents, bright white and charcoal neutrals, ideal for approachable yet modern brand identities."
// }