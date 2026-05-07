"use client";

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

        {isDrawerOpen ? (
          <div
            className="service-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-drawer-title"
          >
            <button
              type="button"
              className="service-drawer__backdrop"
              aria-label="Close service details"
              onClick={() => setIsDrawerOpen(false)}
            />

            <div className="service-drawer__panel">
              <div className="service-drawer__header">
                <h3 id="service-drawer-title">
                  {activeService?.title ?? "Service request"}
                </h3>
                <button
                  type="button"
                  className="service-drawer__close"
                  aria-label="Close service details"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  ×
                </button>
              </div>

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

              <div className="service-drawer__footer">
                <button
                  type="button"
                  className="service-drawer__button service-drawer__button--secondary"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </button>
                {activeService?.link ? (
                  <Link
                    className="service-drawer__button service-drawer__button--primary"
                    href={activeService.link}
                  >
                    See offer
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="service-drawer__button service-drawer__button--primary"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
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

  .service-drawer {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
  }

  .service-drawer__backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(17, 17, 17, 0.55);
    cursor: pointer;
  }

  .service-drawer__panel {
    position: relative;
    width: min(760px, 100%);
    height: 100%;
    background: #fff;
    padding: 1.5rem;
    overflow-y: auto;
    box-shadow: -24px 0 64px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .service-drawer__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    h3 {
      font-size: clamp(1.5rem, 3vw, 2rem);
      line-height: 1;
      font-weight: 800;
    }
  }

  .service-drawer__close {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    border: 1px solid #ddd;
    background: #fff;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
  }

  .service-drawer__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .service-drawer__button {
    min-height: 44px;
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    font-weight: 700;
    border: 1px solid #d8d8d8;
    text-align: center;
  }

  .service-drawer__button--secondary {
    background: #fff;
    cursor: pointer;
  }

  .service-drawer__button--primary {
    background: #111;
    color: #fff;
    border-color: #111;
  }

  @media all and (max-width: 720px) {
    .service-drawer {
      justify-content: center;
      align-items: flex-end;
    }

    .service-drawer__panel {
      width: 100%;
      max-height: 88vh;
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
    }
  }
`;