import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <div className="property-card">
      <div className="relative overflow-hidden h-48 sm:h-56">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-4 space-y-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-1/4 h-4" />
        <div className="flex gap-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <Skeleton className="w-full h-10 rounded-md" />
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
