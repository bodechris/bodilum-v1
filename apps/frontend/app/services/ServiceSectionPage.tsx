"use client";

import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import PageV0 from "@/components/ui/page-v0/PageV0";
import styled from "styled-components";
import SingleServiceV0 from "./SingleServiceV0";
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
          lazyMount
          unmountOnExit
          placement="end"
          open={isDrawerOpen}
          onOpenChange={(details) => setIsDrawerOpen(details.open)}
        >
          <Portal>
            <Drawer.Backdrop bg="rgba(17, 17, 17, 0.55)" />
            <Drawer.Positioner p={{ base: "0", md: "4" }}>
              <Drawer.Content
                maxW={{ base: "100%", md: "760px" }}
                maxH={{ base: "88vh", md: "calc(100vh - 2rem)" }}
                borderRadius={{ base: "1.5rem 1.5rem 0 0", md: "1.75rem" }}
                boxShadow="-24px 0 64px rgba(0, 0, 0, 0.18)"
              >
                <Drawer.Header display="flex" alignItems="flex-start" gap="1rem" pb="1rem">
                  <Drawer.Title fontSize="clamp(1.5rem, 3vw, 2rem)" lineHeight="1" fontWeight="800">
                    {activeService?.title ?? "Service request"}
                  </Drawer.Title>
                </Drawer.Header>

                <Drawer.CloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    position="absolute"
                    top="1.25rem"
                    insetEnd="1.25rem"
                    rounded="full"
                    borderWidth="1px"
                    borderColor="#ddd"
                    bg="#fff"
                  />
                </Drawer.CloseTrigger>

                <Drawer.Body display="flex" flexDirection="column" gap="1rem">
                  {activeService?.thumbnail && (
                    <img
                      src={activeService.thumbnail}
                      alt={activeService.title}
                      style={{
                        width: "100%",
                        maxHeight: "220px",
                        objectFit: "cover",
                        borderRadius: "1rem",
                      }}
                    />
                  )}
                  <p style={{ color: "#555", lineHeight: 1.5 }}>
                    {activeService?.description ??
                      "Choose a service to see its details here."}
                  </p>
                  {activeService?.bestFor && (
                    <p style={{ color: "#555", lineHeight: 1.5 }}>
                      <strong>Best for:</strong> {activeService.bestFor}
                    </p>
                  )}
                  {activeService?.deliverables?.length ? (
                    <div>
                      <strong>Deliverables</strong>
                      <ul style={{ marginTop: "0.75rem", paddingLeft: "1rem", color: "#555" }}>
                        {activeService.deliverables.map((deliverable) => (
                          <li key={deliverable}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </Drawer.Body>

                <Drawer.Footer display="flex" flexWrap="wrap" gap="0.75rem" pt="0.5rem">
                  <Button
                    type="button"
                    minH="44px"
                    px="1.1rem"
                    rounded="full"
                    fontWeight="700"
                    borderWidth="1px"
                    borderColor="#d8d8d8"
                    bg="#fff"
                    color="#111"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                  {activeService?.link ? (
                    <Button
                      asChild
                      minH="44px"
                      px="1.1rem"
                      rounded="full"
                      fontWeight="700"
                      bg="#111"
                      color="#fff"
                      borderWidth="1px"
                      borderColor="#111"
                    >
                      <Link href={activeService.link}>See offer</Link>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      minH="44px"
                      px="1.1rem"
                      rounded="full"
                      fontWeight="700"
                      bg="#111"
                      color="#fff"
                      borderWidth="1px"
                      borderColor="#111"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Close
                    </Button>
                  )}
                </Drawer.Footer>
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
`;