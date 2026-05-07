import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function AIAssistedStarterLandingPage() {
  const service = getServiceByLink("/services/web-development/ai-assisted-starter-landing-page");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default AIAssistedStarterLandingPage;