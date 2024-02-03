import { useContext } from "react";
import VesivioContext from "../context/VesuvioProvider";

const useVesuvio = () => {
    return useContext(VesivioContext);
}

export default useVesuvio;