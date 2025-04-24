"use client";
import { Button } from "@/components/ui/button";
import { RentalCard } from "@/components/ui/core/RentalsTable/RentalCard";
import { deleteRental } from "@/services/RentalsService";
import { IRental } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ManageLandlordRentalsProps {
  myListings: IRental[];
}

const ManageLandlordRentals = ({ myListings }: ManageLandlordRentalsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [rentalToDelete, setRentalToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setRentalToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!rentalToDelete) return;

    setDeletingId(rentalToDelete);
    const toastId = toast.loading("Deleting rental...");
    setShowDeleteDialog(false);

    try {
      const res = await deleteRental(rentalToDelete);

      if (res?.status) {
        toast.success("Rental deleted successfully", { id: toastId });
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete rental", { id: toastId });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting the rental", {
        id: toastId,
      });
    } finally {
      setDeletingId(null);
      setRentalToDelete(null);
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              rental listing and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {myListings?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            You {`haven't`} listed any rentals yet.
          </p>
          <Link href="/landlord/listedRentals/createRental">
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
              Create Your First Rental
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {myListings.length &&
            myListings?.map((rental) => (
              <RentalCard
                key={rental._id}
                rental={rental}
                handleDelete={handleDelete}
                isDeleting={deletingId === rental._id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageLandlordRentals;
