import { MapPin, Bed, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IRental } from "@/types";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface RentalCardProps {
  rental: IRental;
  handleDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function RentalCard({
  rental,
  handleDelete,
  isDeleting = false,
}: RentalCardProps) {
  const { user } = useUser();

  const {
    _id,
    title,
    location,
    rent,
    bedrooms,
    images,
    availability,
    amenities = [],
  } = rental;

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await handleDelete(_id);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={
            images?.[0] ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!availability && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-3 py-1.5">
              Rented
            </Badge>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-emerald-800 text-md">
          ${rent.toLocaleString()}/month
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 text-emerald-800 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center text-emerald-700 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center text-emerald-800 text-sm mb-4">
          <Bed className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>
            {bedrooms} Bedroom{bedrooms > 1 ? "s" : ""}
          </span>
        </div>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 2).map((item, idx) => (
              <Badge key={idx} variant="secondary" className="bg-emerald-100">
                {item}
              </Badge>
            ))}
            {amenities.length > 2 && (
              <Badge variant="outline" className="bg-emerald-100">
                +{amenities.length - 2} more
              </Badge>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="default"
            title="Details"
            className="bg-emerald-600 hover:bg-emerald-800"
            size="sm"
            asChild
          >
            <Link href={`/rentals/${_id}`}>View</Link>
          </Button>

          <Button
            variant="destructive"
            title="Delete"
            className="bg-red-500 hover:bg-red-600"
            size="sm"
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="secondary"
            title="Edit"
            className="bg-sky-600 hover:bg-sky-700"
            size="sm"
            asChild
          >
            <Link
              href={
                user?.role == "admin"
                  ? `/admin/allLists/adminUpdateRental/${_id}`
                  : `/landlord/listedRentals/updateRental/${_id}`
              }
            >
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
