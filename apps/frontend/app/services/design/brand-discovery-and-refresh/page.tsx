import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function BrandDiscoveryAndRefreshPage() {
  const service = getServiceByLink("/services/design/brand-discovery-and-refresh");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default BrandDiscoveryAndRefreshPage;