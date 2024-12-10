import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"
import { FormEventHandler } from 'react';

export default function Chat() {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('messages.store'), {
            onFinish: () => reset('content'),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Chat" />
            <div className='m-auto max-w-[40rem]'>
                <Textarea placeholder="Type your message here." />
            </div>
        </AuthenticatedLayout>
    );
}
