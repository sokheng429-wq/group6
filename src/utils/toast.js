import { toast } from 'vue3-toastify';
import router from "@/router";

export const nofity = {
    success(text, location){
        return toast.success(text, {
            position : 'bottom-left',
            autoClose: 1000,
            onClose : () => {
                router.push(location)
            }
        });
    }
}