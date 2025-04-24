import { ITenantRequest } from "@/types";
import { Hand } from "lucide-react";
import TenantRequestCard from "../../requests/TenantRequestCard";

type TTenantRequestProps = {
  tenantRequests: ITenantRequest[];
};

const TenantRequests = ({ tenantRequests }: TTenantRequestProps) => {
  if (tenantRequests.length === 0) {
    return (
      <div className="h-52 grid place-content-center">
        <p>You do not do any request</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Hand className="w-5 h-5" /> Tenant Requests
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {tenantRequests.length &&
          tenantRequests?.map((request) => (
            <TenantRequestCard key={request._id} requestData={request} />
          ))}
      </div>
    </div>
  );
};

export default TenantRequests;
