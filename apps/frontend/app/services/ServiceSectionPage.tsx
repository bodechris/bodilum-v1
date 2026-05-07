"use client";

import { ReactNode, useMemo, useState } from "react";
import PageV0 from "@/components/ui/page-v0/PageV0";
import styled from "styled-components";
import SingleServiceV0 from "./SingleServiceV0";
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import {
  ServiceDrawerPayload,
  ServiceSectionDrawerContext,
} from "./ServiceSectionDrawerContext";

export type SingleServiceProp = {
  title: string;
  description: string;
  link: string;
  price?: string;
  bestFor?: string;
  deliverables?: string[];
  thumbnail?: string;
};

type ServiceSectionPageProps = {
  title: string;
  subtitle?: string;
  description?: string;
  media?: string;
  services?: SingleServiceProp[];
  children?: ReactNode;
};

function ServiceSectionPage(props: ServiceSectionPageProps) {
  const { title, subtitle, description, media, services, children } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceDrawerPayload | null>(null);

  const drawerContextValue = useMemo(
    () => ({
      activeService,
      isOpen: isDrawerOpen,
      openDrawer: (service?: ServiceDrawerPayload | null) => {
        if (service) {
          setActiveService(service);
        }

        setIsDrawerOpen(true);
      },
      closeDrawer: () => setIsDrawerOpen(false),
      setActiveService,
    }),
    [activeService, isDrawerOpen],
  );

  return (
    <ServiceSectionDrawerContext.Provider value={drawerContextValue}>
      <>
        <PageV0>
          <ServiceSectionWrapper>
            <div className="service-section__header">
              <div className="service-section__header-info">
                <h1>{title}</h1>
                {subtitle && <h2>{subtitle}</h2>}
                {description && <p>{description}</p>}
              </div>
              <div className="service-section__header-media">
                {media && <img src={media} alt={title} />}
              </div>
            </div>
            {children}
            {services && (
              <div className="service-section__services">
                {services.map((service, index) => (
                  <SingleServiceV0 key={index} {...service} />
                ))}
              </div>
            )}
          </ServiceSectionWrapper>
        </PageV0>

        <Drawer.Root
          open={isDrawerOpen}
          onOpenChange={(details) => setIsDrawerOpen(details.open)}
          key='xl' size='xl'
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner padding="4">
              <Drawer.Content rounded="md" maxW="8xl">
                <Drawer.Header>
                  <Drawer.Title>
                    {activeService?.title ?? "Service request"}
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <div className="service-drawer__body">
                    {activeService?.thumbnail && (
                      <img
                        className="service-drawer__image"
                        src={activeService.thumbnail}
                        alt={activeService.title}
                      />
                    )}
                    <p>
                      {activeService?.description ??
                        "Choose a service to see its details here."}
                    </p>
                    {activeService?.bestFor && (
                      <p>
                        <strong>Best for:</strong> {activeService.bestFor}
                      </p>
                    )}
                    {activeService?.deliverables?.length ? (
                      <div>
                        <strong>Deliverables</strong>
                        <ul>
                          {activeService.deliverables.map((deliverable) => (
                            <li key={deliverable}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                    Cancel
                  </Button>
                  {activeService?.link ? (
                    <Button asChild>
                      <a href={activeService.link}>See offer</a>
                    </Button>
                  ) : (
                    <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
                  )}
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </>
    </ServiceSectionDrawerContext.Provider>
  );
}

export default ServiceSectionPage;
export { useServiceSectionDrawer } from "./ServiceSectionDrawerContext";


const ServiceSectionWrapper = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 10rem;
  border: 1px solid #f7f7f7;
  padding: 2rem;
  border-radius: 25%;

  margin-top: 2rem;
  position: relative;

  .service-section__header {
    display: flex;
    width: 100%;
    gap: 10rem;
    justify-content: space-between;

    position: relative;

    flex-direction: column;
    align-items: flex-start;

    .service-section__header-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      gap: 1rem;
      width: min(1000px, 100%);
      height: 100%;
      h1 {
        font-size: clamp(45px, 10vw, 100px);
        font-weight: bolder;
        line-height: 1.0;
        }
      h2 {
        font-size: clamp(1.5rem, 2vw, 2rem);        
        font-weight: bolder;
        line-height: 1.0;
      }
      p {
        font-size: clamp(12px, 2.5vw, 20px);
        line-height: 1.2;
        color: #777;
        margin-top: 1rem;
      }
    }

    .service-section__header-media {
      width: 60%;
      height: 60vh;
      background: #fff;
      border-radius: 2rem;
      // border: 0.5px solid #f0f0f0;
      // overflow: hidden;

      position: relative;

      -webkit-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
      -moz-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
      -ms-transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 1.0s cubic-bezier(0.16, 1, 0.3, 1);

      -webkit-box-shadow: 0px 40px 50px 2px rgba(0,0,0,0.05);
      -moz-box-shadow:    0px 40px 50px 2px rgba(0,0,0,0.05);
      box-shadow:         0px 40px 50px 2px rgba(0,0,0,0.05); 

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 1rem;
      }
    }

    

    @media all and (min-width: 768px) {
      flex-direction: row;
    }
  }


  .service-section__services {
    display: grid;
    position: relative;
    width: 100%;
    height: padding-bottom: 2rem;
    margin-top: 8rem;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-rows: 400px;
  }

  .service-drawer__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      color: #555;
      line-height: 1.5;
    }

    ul {
      margin-top: 0.75rem;
      padding-left: 1rem;
      color: #555;
    }
  }

  .service-drawer__image {
    width: 100%;
    max-height: 220px;
    object-fit: cover;
    border-radius: 1rem;
  }
`;