import { useContext } from "react";
import VesuvioContext from "../context/VesuvioProvider";

const useVesuvio = () => {
    return useContext(VesuvioContext);
}

export default useVesuvio;