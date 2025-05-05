"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { verify } from "@/services/requestService";

interface RequestData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function OrderVerification() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Manually extract search params without `useSearchParams()`
    const params = new URLSearchParams(window.location.search);
    console.log(params.get("order_id"));
    setOrderId(params.get("order_id"));

    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await verify(orderId);
        setOrderData(response?.data?.[0] || null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch order data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Request Verification</h1>
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-red-500">Request Not Found</h1>
        <p className="text-gray-500">
          {error || "Please check your order ID and try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Request Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Request Details */}
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Request ID:</dt>
              <dd>{orderData.order_id}</dd>
              <dt className="font-semibold">Advance Pay Amount:</dt>
              <dd>
                {orderData.currency} {orderData.amount.toFixed(2)}
              </dd>
              <dt className="font-semibold">Status:</dt>
              <dd>
                <Badge
                  variant={
                    orderData.bank_status === "Success"
                      ? "default"
                      : "destructive"
                  }
                >
                  {orderData.bank_status}
                </Badge>
              </dd>
              <dt className="font-semibold">Date:</dt>
              <dd>{new Date(orderData.date_time).toLocaleString()}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Method:</dt>
              <dd>{orderData.method}</dd>
              <dt className="font-semibold">Transaction ID:</dt>
              <dd>{orderData.bank_trx_id}</dd>
              <dt className="font-semibold">Invoice No:</dt>
              <dd>{orderData.invoice_no}</dd>
              <dt className="font-semibold">SP Code:</dt>
              <dd>{orderData.sp_code}</dd>
              <dt className="font-semibold">SP Message:</dt>
              <dd>{orderData.sp_message}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Name:</dt>
              <dd>{orderData.name}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{orderData.email}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {orderData.is_verify === 1 ? (
                <>
                  <CheckCircle className="text-green-500" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-yellow-500" />
                  <span>Not Verified</span>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/tenant/myRequests">
              <Button className="w-full bg-[#FF4B27] hover:bg-orange-500 text-white">
                View Orders
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
