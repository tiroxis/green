import * as whatsAppClient from "@green-api/whatsapp-api-client";

interface GreenApiProps {
    apiUrl: string;
    mediaUrl: string;
    idInstance: string;
    apiTokenInstance: string;
}
class GreenApi{
    private instance;
    constructor(props: GreenApiProps) {
        return this.instance = whatsAppClient.restAPI({
            idInstance: props.idInstance,
            apiTokenInstance: props.apiTokenInstance,
        });
    }
}

export {GreenApi}