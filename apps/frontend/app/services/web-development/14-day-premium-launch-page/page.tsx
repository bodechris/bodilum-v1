import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function PremiumLaunchPage() {
  const service = getServiceByLink("/services/web-development/14-day-premium-launch-page");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default PremiumLaunchPage;