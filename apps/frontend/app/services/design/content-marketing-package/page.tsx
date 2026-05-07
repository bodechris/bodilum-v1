import { notFound } from "next/navigation";
import SingleServiceDetailPage from "../../SingleServiceDetailPage";
import { getServiceByLink } from "../../servicesData";

function ContentMarketingPackagePage() {
  const service = getServiceByLink("/services/design/content-marketing-package");

  if (!service) {
    notFound();
  }

  return <SingleServiceDetailPage service={service} />;
}

export default ContentMarketingPackagePage;