import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function AIOpportunityAuditPage() {
  const service = getServiceByLink("/services/ai-integrations/ai-opportunity-audit");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default AIOpportunityAuditPage;