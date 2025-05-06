interface SkeletonProps {
  className: string;
  "data-sidebar"?: string;
  style?: React.CSSProperties;
}
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
}: {
  className?: string;
}) => <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
