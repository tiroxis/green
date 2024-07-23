import { Control, Controller, FieldPathByValue, FieldValues, useController, useForm } from "react-hook-form";

interface InputFieldProps extends Partial<HTMLInputElement>{
    label: string;
}

export function InputField<
    TFieldValues extends FieldValues,
    TName extends FieldPathByValue<TFieldValues, string>
>({control, name, label}: { control: Control<TFieldValues>, name: TName, label?: string }) {
    const {field} = useController({
        control,
        name,
    });

    return <div className="field gap-2">
        <label>{label}</label>
        <Controller control={control} name={name} render={({ field }) => <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            {...field}
        />}>
        </Controller>
    </div>
}