import ImageKit from "imagekit-javascript";
import { IMAGEKIT_ENDPOINT, IMAGEKIT_PUBLIC_KEY, API_URL } from "../config";

export default new ImageKit({
   urlEndpoint: IMAGEKIT_ENDPOINT,
   publicKey: IMAGEKIT_PUBLIC_KEY,
   authenticationEndpoint: `${API_URL}/utils/image-kit/auth`,
});
