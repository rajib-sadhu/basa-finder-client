import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";

const LandlordDashboard = () => {
  return (
    <div>
      <HeaderPath role="Landlord" subPath="Dashboard" />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-emerald-100" />
        <div className="aspect-video rounded-xl bg-emerald-100" />
        <div className="aspect-video rounded-xl bg-emerald-100" />
      </div>
    </div>
  );
};

export default LandlordDashboard;
