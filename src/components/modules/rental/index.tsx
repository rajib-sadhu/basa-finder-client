"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { RentalCard } from "@/components/ui/core/RentalsTable/RentalCard";
import { deleteRental } from "@/services/RentalsService";
import { IRental } from "@/types";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(myListings.length / itemsPerPage);

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

  // Paginated listings
  const paginatedListings = myListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            You haven&apos;t listed any rentals yet.
          </p>
          <Link href="/landlord/listedRentals/createRental">
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
              Create Your First Rental
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {paginatedListings.map((rental) => (
              <RentalCard
                key={rental._id}
                rental={rental}
                handleDelete={handleDelete}
                isDeleting={deletingId === rental._id}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {/* Previous Button */}
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {/* Numbered Page Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 p-0 ${
                      currentPage === pageNum
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                )
              )}

              {/* Next Button */}
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageLandlordRentals;
