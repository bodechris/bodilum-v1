import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function SmallBusinessMakeoverPage() {
  const service = getServiceByLink("/services/design/48-hour-small-business-makeover");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default SmallBusinessMakeoverPage;