import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function PrototypeToProductionEngineeringSprintPage() {
  const service = getServiceByLink("/services/web-development/prototype-to-production-engineering-sprint");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default PrototypeToProductionEngineeringSprintPage;