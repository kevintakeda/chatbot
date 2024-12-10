import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {


    return (
        <>
            <Head title="Welcome" />
            <GuestLayout>
                Make something great;
            </GuestLayout>
        </>
    );
}
