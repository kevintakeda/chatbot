import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"

export default function Chat() {
    return (
        <AuthenticatedLayout>
            <Head title="Chat" />
            <div className='m-auto max-w-[40rem]'>
                <Textarea placeholder="Type your message here." />
            </div>
        </AuthenticatedLayout>
    );
}
