export type DesignDirectionDetailsType = {
  cover: Record<string, any>;
}
export type DesignDirectionDataType = {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnails: string[];
  layout?: string;
  price?: string;
  timeline?: string;
  bestFor?: string;
  faqs?: { question: string; answer: string }[];
  sections?: DesignDirectionDetailsType
};

export const designDirectionData: DesignDirectionDataType[] = [
    {
      id: 1,
      title: 'savanah nest brand identity',
      description: 'Description for Design Direction 1',
      category: 'Real Estate',
      layout: 'layout-5',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Real Estate, Interior Design, Architecture",

      thumbnails: [
        '/images/real-estate-savanah-nest/savanah-nest-img-8.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-9.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-10.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-11.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-12.webp',
      ],

      sections: {
        cover: {
          mainImg: '/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp',
          previewImgs: [
            '/images/real-estate-savanah-nest/savanah-nest-img-1.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-2.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-3.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-4.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-5.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-6.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-7.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-8.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-9.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-10.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-11.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-12.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-13.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-14.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-15.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-16.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-17.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-18.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-19.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-20.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-21.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-22.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-23.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-24.webp'
          ],
          overview: [
            '9 high-end smart tech mockup templates built for sleek product branding - featuring IoT controls, smart home gadgets, pin-style interfaces, Apple-like devices, scooter UI, and multiple digital displays.',
            'Every object and surface is fully color-adjustable, so you can match any brand palette or mood. Drop in your design fast using Photoshop Smart Objects, or edit directly in our online mockup editor for quick, flexible workflow.'
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      }
    },
    {
      id: 2,
      title: 'moria beauty brand identity',
      description: 'Description for Design Direction 2',
      category: 'Beauty',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Beauty, Skincare, Wellness",
      thumbnails: [
        '/images/beauty-moria/mori-logo-bg-1.webp',
        '/images/beauty-moria/moria-img-1.webp',
        '/images/beauty-moria/moria-img-2.webp',
        '/images/beauty-moria/moria-img-3.webp',
        '/images/beauty-moria/moria-img-4.webp',
        '/images/beauty-moria/moria-img-5.webp',
        '/images/beauty-moria/moria-img-6.webp',
        '/images/beauty-moria/moria-img-7.webp',
        '/images/beauty-moria/moria-img-8.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/beauty-moria/mori-logo-bg-1.webp',
          previewImgs: [
            '/images/beauty-moria/moria-img-2.webp',
            '/images/beauty-moria/moria-img-3.webp',
            '/images/beauty-moria/moria-img-4.webp',
            '/images/beauty-moria/moria-img-5.webp',
            '/images/beauty-moria/moria-img-6.webp',
            '/images/beauty-moria/moria-img-7.webp',
            '/images/beauty-moria/moria-img-8.webp',
            '/images/beauty-moria/moria-img-2.webp',
            '/images/beauty-moria/moria-img-3.webp',
            '/images/beauty-moria/moria-img-4.webp',
            '/images/beauty-moria/moria-img-5.webp',
            '/images/beauty-moria/moria-img-6.webp',
            '/images/beauty-moria/moria-img-7.webp',
            '/images/beauty-moria/moria-img-8.webp',
            '/images/beauty-moria/moria-img-9.webp',
            '/images/beauty-moria/moria-img-10.webp',
            '/images/beauty-moria/moria-img-11.webp',
            '/images/beauty-moria/moria-img-12.webp',
            '/images/beauty-moria/moria-img-13.webp',
            '/images/beauty-moria/moria-img-14.webp',
            '/images/beauty-moria/moria-img-15.webp',
            '/images/beauty-moria/moria-img-16.webp',
            '/images/beauty-moria/moria-img-17.webp',
            '/images/beauty-moria/moria-img-18.webp'
          ],
          overview: [
            '9 high-end smart tech mockup templates built for sleek product branding - featuring IoT controls, smart home gadgets, pin-style interfaces, Apple-like devices, scooter UI, and multiple digital displays.',
            'Every object and surface is fully color-adjustable, so you can match any brand palette or mood. Drop in your design fast using Photoshop Smart Objects, or edit directly in our online mockup editor for quick, flexible workflow.'
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      }
    },
    {
      id: 3,
      title: 'Yossi beauty brand identity',
      description: 'Description for Design Direction 3',
      category: 'Beauty',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Beauty, Skincare, Wellness",
      thumbnails: [
        '/images/beauty-yossi/yossi-img-3.webp',
        '/images/beauty-yossi/yossi-img-1.webp',
        '/images/beauty-yossi/yossi-img-5.webp',
        '/images/beauty-yossi/yossi-img-4.webp',
        '/images/beauty-yossi/yossi-img-6.webp',
        '/images/beauty-yossi/yossi-img-7.webp',
        '/images/beauty-yossi/yossi-img-8.webp',
        '/images/beauty-yossi/yossi-img-9.webp',
        '/images/beauty-yossi/yossi-img-10.webp',
        '/images/beauty-yossi/yossi-img-11.webp',
        '/images/beauty-yossi/yossi-img-12.webp',
      ],
     sections: {
        cover: {
          mainImg: '/images/beauty-yossi/yossi-2560-1440.webp',
          previewImgs: [
            '/images/beauty-yossi/yossi-img-1.webp',
            '/images/beauty-yossi/yossi-img-2.webp',
            '/images/beauty-yossi/yossi-img-3.webp',
            '/images/beauty-yossi/yossi-img-4.webp',
            '/images/beauty-yossi/yossi-img-5.webp',
            '/images/beauty-yossi/yossi-img-6.webp',
            '/images/beauty-yossi/yossi-img-7.webp',
            '/images/beauty-yossi/yossi-img-8.webp',
            '/images/beauty-yossi/yossi-img-2.webp',
            '/images/beauty-yossi/yossi-img-3.webp',
            '/images/beauty-yossi/yossi-img-4.webp',
            '/images/beauty-yossi/yossi-img-5.webp',
            '/images/beauty-yossi/yossi-img-6.webp',
            '/images/beauty-yossi/yossi-img-7.webp',
            '/images/beauty-yossi/yossi-img-8.webp',
            '/images/beauty-yossi/yossi-img-9.webp',
            '/images/beauty-yossi/yossi-img-10.webp',
            '/images/beauty-yossi/yossi-img-11.webp',
            '/images/beauty-yossi/yossi-img-12.webp',
            '/images/beauty-yossi/yossi-img-13.webp',
            '/images/beauty-yossi/yossi-img-14.webp',
            '/images/beauty-yossi/yossi-img-15.webp',
            '/images/beauty-yossi/yossi-img-16.webp',
            '/images/beauty-yossi/yossi-img-17.webp',
            '/images/beauty-yossi/yossi-img-18.webp',
          ],
          overview: [
            '9 high-end smart tech mockup templates built for sleek product branding - featuring IoT controls, smart home gadgets, pin-style interfaces, Apple-like devices, scooter UI, and multiple digital displays.',
            'Every object and surface is fully color-adjustable, so you can match any brand palette or mood. Drop in your design fast using Photoshop Smart Objects, or edit directly in our online mockup editor for quick, flexible workflow.'
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      }
    },
    {
      id: 4,
      title: 'Moveasi brand identity',
      description: 'Description for Design Direction 4',
      category: 'Tech & Saas',
      layout: 'layout-3',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Tech & Saas, Startups, Innovation",
      thumbnails: [
        '/images/tech-saas-moveasi/moveasi-img-4.webp',
        '/images/tech-saas-moveasi/moveasi-img-2.webp',
        '/images/tech-saas-moveasi/moveasi-img-3.webp',
        '/images/tech-saas-moveasi/moveasi-img-1.webp',
        '/images/tech-saas-moveasi/moveasi-img-5.webp',
        '/images/tech-saas-moveasi/moveasi-img-6.webp',
        '/images/tech-saas-moveasi/moveasi-img-7.webp',
        '/images/tech-saas-moveasi/moveasi-img-8.webp',
        '/images/tech-saas-moveasi/moveasi-img-9.webp',
        '/images/tech-saas-moveasi/moveasi-img-10.webp',
        '/images/tech-saas-moveasi/moveasi-img-11.webp',
        '/images/tech-saas-moveasi/moveasi-img-12.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/tech-saas-moveasi/moveasi-img-1.webp',
          previewImgs: [
            '/images/tech-saas-moveasi/moveasi-img-1.webp',
            '/images/tech-saas-moveasi/moveasi-img-2.webp',
            '/images/tech-saas-moveasi/moveasi-img-3.webp',
            '/images/tech-saas-moveasi/moveasi-img-4.webp',
            '/images/tech-saas-moveasi/moveasi-img-5.webp',
            '/images/tech-saas-moveasi/moveasi-img-6.webp',
            '/images/tech-saas-moveasi/moveasi-img-7.webp',
            '/images/tech-saas-moveasi/moveasi-img-8.webp',
            '/images/tech-saas-moveasi/moveasi-img-2.webp',
            '/images/tech-saas-moveasi/moveasi-img-3.webp',
            '/images/tech-saas-moveasi/moveasi-img-4.webp',
            '/images/tech-saas-moveasi/moveasi-img-5.webp',
            '/images/tech-saas-moveasi/moveasi-img-6.webp',
            '/images/tech-saas-moveasi/moveasi-img-7.webp',
            '/images/tech-saas-moveasi/moveasi-img-8.webp',
            '/images/tech-saas-moveasi/moveasi-img-9.webp',
            '/images/tech-saas-moveasi/moveasi-img-10.webp',
            '/images/tech-saas-moveasi/moveasi-img-11.webp',
            '/images/tech-saas-moveasi/moveasi-img-12.webp',
            '/images/tech-saas-moveasi/moveasi-img-13.webp',
            '/images/tech-saas-moveasi/moveasi-img-14.webp',
            '/images/tech-saas-moveasi/moveasi-img-15.webp',
            '/images/tech-saas-moveasi/moveasi-img-16.webp',
            '/images/tech-saas-moveasi/moveasi-img-17.webp',
            '/images/tech-saas-moveasi/moveasi-img-18.webp',
          ],
          overview: [
            '9 high-end smart tech mockup templates built for sleek product branding - featuring IoT controls, smart home gadgets, pin-style interfaces, Apple-like devices, scooter UI, and multiple digital displays.',
            'Every object and surface is fully color-adjustable, so you can match any brand palette or mood. Drop in your design fast using Photoshop Smart Objects, or edit directly in our online mockup editor for quick, flexible workflow.'
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      }
    },
    {
      id: 5,
      title: 'Mormon brand identity',
      description: 'Description for Design Direction 5',
      category: 'Real Estate',
      layout: 'layout-5',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Real Estate, Interior Design, Architecture",
      thumbnails: [
        '/images/real-estate-mormon/mormon-img-22.webp',
        '/images/real-estate-mormon/mormon-img-2.webp',
        '/images/real-estate-mormon/mormon-img-3.webp',
        '/images/real-estate-mormon/mormon-img-1.webp',
        '/images/real-estate-mormon/mormon-img-5.webp',
        '/images/real-estate-mormon/mormon-img-6.webp',
        '/images/real-estate-mormon/mormon-img-7.webp',
        '/images/real-estate-mormon/mormon-img-8.webp',
        '/images/real-estate-mormon/mormon-img-9.webp',
        '/images/real-estate-mormon/mormon-img-10.webp',
        '/images/real-estate-mormon/mormon-img-11.webp',
        '/images/real-estate-mormon/mormon-img-12.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/real-estate-mormon/mormon-2560-1440.webp',
          previewImgs: [
            '/images/real-estate-mormon/mormon-img-1.webp',
            '/images/real-estate-mormon/mormon-img-2.webp',
            '/images/real-estate-mormon/mormon-img-3.webp',
            '/images/real-estate-mormon/mormon-img-4.webp',
            '/images/real-estate-mormon/mormon-img-5.webp',
            '/images/real-estate-mormon/mormon-img-6.webp',
            '/images/real-estate-mormon/mormon-img-7.webp',
            '/images/real-estate-mormon/mormon-img-8.webp',
            '/images/real-estate-mormon/mormon-img-2.webp',
            '/images/real-estate-mormon/mormon-img-3.webp',
            '/images/real-estate-mormon/mormon-img-4.webp',
            '/images/real-estate-mormon/mormon-img-5.webp',
            '/images/real-estate-mormon/mormon-img-6.webp',
            '/images/real-estate-mormon/mormon-img-7.webp',
            '/images/real-estate-mormon/mormon-img-8.webp',
            '/images/real-estate-mormon/mormon-img-9.webp',
            '/images/real-estate-mormon/mormon-img-10.webp',
            '/images/real-estate-mormon/mormon-img-11.webp',
            '/images/real-estate-mormon/mormon-img-12.webp',
            '/images/real-estate-mormon/mormon-img-13.webp',
            '/images/real-estate-mormon/mormon-img-14.webp',
            '/images/real-estate-mormon/mormon-img-15.webp',
            '/images/real-estate-mormon/mormon-img-16.webp',
            '/images/real-estate-mormon/mormon-img-17.webp',
            '/images/real-estate-mormon/mormon-img-18.webp',
          ],
          overview: [
            '9 high-end smart tech mockup templates built for sleek product branding - featuring IoT controls, smart home gadgets, pin-style interfaces, Apple-like devices, scooter UI, and multiple digital displays.',
            'Every object and surface is fully color-adjustable, so you can match any brand palette or mood. Drop in your design fast using Photoshop Smart Objects, or edit directly in our online mockup editor for quick, flexible workflow.'
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      }
    },
    {
      id: 6,
      title: 'Fleoxx brand identity',
      description: 'Description for Design Direction 6',
      category: 'Tech & Saas',
      price: ">=100",
      timeline: "24 - 48 hours",
      bestFor: "Tech & Saas, Startups, Innovation",
      thumbnails: [
        '/images/tech-saas-fleoxx/fleoxx-img-1.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-13.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-3.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-4.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-5.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-6.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-7.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-8.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-9.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-10.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-11.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-12.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/tech-saas-fleoxx/fleoxx-2560-1440-v1.webp',
          previewImgs: [
            '/images/tech-saas-fleoxx/fleoxx-img-1.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-2.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-3.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-4.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-5.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-6.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-7.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-8.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-2.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-3.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-4.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-5.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-6.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-7.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-8.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-9.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-10.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-11.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-12.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-13.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-14.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-15.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-16.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-17.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-18.webp',
          ],
          overview: [
            '9 high-end smart tech mockup templates built for sleek product branding - featuring IoT controls, smart home gadgets, pin-style interfaces, Apple-like devices, scooter UI, and multiple digital displays.',
            'Every object and surface is fully color-adjustable, so you can match any brand palette or mood. Drop in your design fast using Photoshop Smart Objects, or edit directly in our online mockup editor for quick, flexible workflow.'
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      }
    },
  ];