'use client'

import { InputField } from "@/components/common/form/InputField";
import { Button } from "@/components/common/form/Button";
import { TextAreaField } from "@/components/common/form/TextAreaField";
import { useCallback, useEffect, useState } from "react";
import { GreenApi, greenApi } from "@/components/common/api/GreenApi";
import * as whatsAppClient from "@green-api/whatsapp-api-client";
import { useForm } from "react-hook-form"

type FormGreenApi = {
    idInstance: string
    ApiTokenInstance: string
}

export default function Home() {

    const {
        control,
        formState: { errors },
        getValues,
        setValue
    } = useForm<FormGreenApi>({
        defaultValues: {
            idInstance: process.env.NEXT_PUBLIC_ID_INSTANCE,
            ApiTokenInstance: process.env.NEXT_PUBLIC_API_TOKEN_INSTANCE
        }
    })

    const [apiInstance, setApiInstance] = useState<GreenApi>(null);

    const getSettings = useCallback(async () => {
        const newApiInstance = new GreenApi({
            apiUrl : process.env.NEXT_PUBLIC_API_URL,
            mediaUrl: process.env.NEXT_PUBLIC_MEDIA_URL,
            idInstance: process.env.NEXT_PUBLIC_ID_INSTANCE,
            apiTokenInstance: process.env.NEXT_PUBLIC_API_TOKEN_INSTANCE
        });
        setApiInstance(newApiInstance)
        const response = await newApiInstance.settings.getSettings();
        setValue("response", JSON.stringify(response));
    }, [setValue])

    const getStateInstance = useCallback(async () => {
        const response = await apiInstance.instance.getStateInstance();
        setValue("response", JSON.stringify(response));
    }, [apiInstance, setValue])

    const sendMessage = useCallback(async () => {
        const values = getValues()
        const response = await apiInstance.message.sendMessage(values.chatId, null, values.messageText);
        setValue("response", JSON.stringify(response));
    }, [apiInstance, setValue, getValues])

    const sendFileByUrl = useCallback(async () => {
        const values = getValues()
        const response = await apiInstance.file.sendFileByUrl(values.fileChatId, null, values.urlFile, values.urlFile.split('/').pop());
        setValue("response", JSON.stringify(response));
    }, [apiInstance, setValue])



    return (
        <div className="grid gap-4 grid-cols-2">
            <div className={"grid gap-4 "}>

                <InputField control={control} name="idInstance" label="idInstance" />

                <InputField control={control} name="ApiTokenInstance" label="ApiTokenInstance" />

                <Button onClick={getSettings}>getSettings</Button>
                <Button onClick={getStateInstance}>getStateInstance</Button>

                <InputField control={control} name="chatId" label="chatId"/>
                <TextAreaField control={control} name="messageText" label="messageText"/>
                <Button onClick={sendMessage}>sendMessage</Button>

                <InputField control={control} name="fileChatId" label="fileChatId"/>
                <InputField control={control} name="urlFile" label="urlFile"/>
                <Button onClick={sendFileByUrl}>sendFileByUrl</Button>
            </div>
            <div className="grid-flow-row">
                <TextAreaField control={control} name="response" label="Ответ" />
            </div>

        </div>


    );
}
