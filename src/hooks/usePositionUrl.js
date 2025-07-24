import { useSearchParams } from "react-router-dom";

function usePositionUrl() {
    const [searchParams, setSearchParams] = useSearchParams({
        lat: 40,
        lng: 0,
    });
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat,lng]
}

export default usePositionUrl;