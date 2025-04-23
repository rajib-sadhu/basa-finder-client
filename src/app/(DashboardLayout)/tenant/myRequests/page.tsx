import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import TenantRequests from "@/components/modules/dashboard/tenant/TenantRequests";
import { getTenantRequest } from "@/services/requestService";

const MyRequestsPage = async () => {
  const tenantRequests = await getTenantRequest();
  return (
    <div>
      <HeaderPath role="Tenant" subPath="My Requests" />
      <TenantRequests tenantRequests={tenantRequests} />
    </div>
  );
};

export default MyRequestsPage;
