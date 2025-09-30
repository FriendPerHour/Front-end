import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/api/axios";
import { VolunteerCardService } from "../volunteerServiceCard/volunteerServiceCard";

export default function VolunteerService1() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const [requests, setRequests] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get(`requests/pending/${serviceId}`, {
          withCredentials: true,
        });
        if (res.data.statusCode === 200) {
          setRequests(res.data.data.requests);
          setServiceName(res.data.data.service.name);
        }
      } catch (error) {
        console.error("Error fetching requests", error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) fetchRequests();
  }, [serviceId]);

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div className="container mx-auto">
      <VolunteerCardService requests={requests} serviceName={serviceName} />
    </div>
  );
}
