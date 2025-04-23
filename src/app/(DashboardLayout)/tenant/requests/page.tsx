'use client';

import { useEffect, useState } from 'react';
// import { createMypayment, getMyRequest } from '@/services/requestRental';
import { useUser } from '@/context/UserContext';
// import { RentalRequest } from '@/types/request';
import { Skeleton } from '@/components/ui/skeleton';
import { ILandlordRequest } from '@/types';
import { createMypayment, getMyRequest } from '@/services/requestService';

const MyRequestsPage = () => {
    const { user } = useUser();
    const [requests, setRequests] = useState<ILandlordRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const handlePayment = async (tenantId: string) => {
        try {
            const paymentResponse = await createMypayment(tenantId, {});
            console.log(paymentResponse);
            if (paymentResponse?.data.result) {
                // Redirect user to payment page
                window.location.href = paymentResponse.data.result;
            } else {
                console.log("Payment failed or checkout URL missing", paymentResponse);
            }
        } catch (error) {
            console.log("Error processing payment:", error);
        }
    };

    useEffect(() => {
        const fetchRequests = async () => {
            console.log(user?._id);
            if (!user?._id) return;
            try {
                const data = await getMyRequest(user?._id);
                setRequests(Array.isArray(data?.data) ? data?.data : []);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRequests();
    }, [user]);
    console.log(requests);
    if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    console.log(requests);
    return (
        <div className="py-20 md:p-6">
            <h2 className="text-4xl font-bold mb-8 text-center">My Rental Requests</h2>
            {requests.length === 0 ? (
                <p>No rental requests found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {requests.map((request) => (
                        <div key={request._id} className="p-4 border rounded bg-white shadow-md">
                            <p className="text-xl font-semibold text-blue-800"><strong>Tenant Name:</strong> {request.name}</p>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Message:</strong> {request.message}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <p><strong>Payment Status:</strong> {request.paymentStatus}</p>
                            <button
                                disabled={request.status !== 'approved' || request.paymentStatus === 'paid'}
                                onClick={() => handlePayment(request._id)}
                                className={`mt-4 px-4 py-2 rounded ${request.status === 'approved' && request.paymentStatus !== 'paid'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-400 text-gray-800'
                                    }`}
                            >
                                {request.paymentStatus === 'paid' ? 'Payment Completed' : request.status === 'approved' ? 'Proceed to Payment' : 'Payment Disabled'}
                            </button>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequestsPage;