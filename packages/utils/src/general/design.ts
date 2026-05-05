export const designFolder = {
    logo: "logos",
    bizcard: "bizcards",
    resume: "resume",
    cv: "resume",
    "xpo-office": "xpo-offices",
    'biz-form': "bizforms",
    'brand-book': "brand-books",
    "greeting-card": "corporate-greeting-cards",
    "corporate-identity": "corporate-identities",
    "corporate-presentation": "corporate-presentations",
    "corporate-profile": "corporate-profiles",
    "digital-form": "bizforms",
    "email-signature": "email-signatures",
    "flyer-poster-banner": "flyers-posters-banners",
    flyer: "flyers-posters-banners",
    poster: "flyers-posters-banners",
    banner: "flyers-posters-banners",
    "id-card": "id-cards",
    "invoice": "invoices-quotes-receipts",
    "quote": "invoices-quotes-receipts",
    "receipt": "invoices-quotes-receipts",
    letterhead: "letterheads",
    portfolio: "portfolios",
    pricelist: "pricelists",
    "profile-card": "profile-cards", 
    video: "videos",
  };


interface DesignInfo {
    sku?: string;
    [key: string]: any;
}

interface BrandState {
    colors?: string[];
    fonts?: Record<string, any>;
    brandinfo?: {
        name: string;
    };
    [key: string]: any;
}

interface DispatchBrandState {
    (action: { type: string; payload?: any; field?: string }): void;
}

interface Layout {
    colors?: string[];
    fonts?: Record<string, any>;
    "design-desc"?: {
        text?: string[];
    };
    [key: string]: any;
}

// export const getDesignLyt = async (
//     url: string,
//     batype: keyof typeof designFolder,
//     designInfo: DesignInfo = {},
//     brandState: BrandState = {},
//     dispatchBrandState: DispatchBrandState
// ): Promise<void> => {
//     const selDesign = {
//         info: {} as DesignInfo,
//         desc: {} as Layout,
//         colors: [""],
//         fonts: {} as Record<string, any>
//     };
//     selDesign.info = JSON.parse(JSON.stringify(designInfo)); // deep copy

//     let subFolder =
//         batype === "flyer" || batype === "poster"
//             ? "/flyers-posters"
//             : batype === "banner"
//             ? "/banners"
//             : "";
//     let { lyt } = await import(
//         `@bx/library/brand-asset-templates/${designFolder[batype]}/designs/layouts${subFolder}/${url}`
//     );

//     if (lyt) {
//         if (lyt["colors"]) selDesign["colors"] = [...lyt["colors"]];
//         if (lyt["fonts"]) selDesign["fonts"] = { ...lyt["fonts"] };

//         if (lyt["design-desc"] && lyt["design-desc"]["text"])
//             lyt["design-desc"]["text"] = brandState["brandinfo"]?.["name"]?.split(" ");

//         selDesign.desc = JSON.parse(JSON.stringify(lyt)); // deep copy
//     }

//     if (dispatchBrandState) dispatchBrandState({ type: "updateBrandFonts", payload: lyt["fonts"] });
//     if (dispatchBrandState) dispatchBrandState({ type: "updateBrandAssets", field: "logo", payload: selDesign });
// };

// interface ExtractAndSetDesignParams {
//     designInfo?: DesignInfo;
//     brandState: BrandState;
//     dispatch: DispatchBrandState;
// }

// export const extractAndSetDesign = (
//     designInfo: ExtractAndSetDesignParams["designInfo"] = {},
//     brandState: ExtractAndSetDesignParams["brandState"],
//     dispatch: ExtractAndSetDesignParams["dispatch"]
// ): null | void => {
//     if (!designInfo["sku"] || !brandState || !dispatch) return null;

//     console.log('extractAndSetDesign...1');

//     let skuArr = designInfo["sku"].split('-');
//     let url = `design${skuArr[0]}_${skuArr[1]}_${skuArr[2]}.ts`;

//     // get design object
//     getDesignLyt(url, "logo", designInfo, brandState, dispatch);
// };