import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { UserContext } from "../Context/AllContext";

export function useServiceMap() {
  const [map, setMap] = useState({});
  const { userLogin, loading } = useContext(UserContext);

  useEffect(() => {
    if (loading) return;

    if (!userLogin) return;

    const fetchData = async () => {
      try {
        const res = await api.get("requests/AllService", {
          withCredentials: true,
        });
        const data = res.data.data;
        const newMap = {};
        data.forEach((s) => {
          newMap[s.alias] = s.id;
        });
        setMap(newMap);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchData();
  }, [userLogin, loading]);

  return map;
}
