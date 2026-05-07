import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function AIBusinessUpgradeSprintPage() {
  const service = getServiceByLink("/services/ai-integrations/ai-business-upgrade-sprint");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default AIBusinessUpgradeSprintPage;