import { Button } from '@/components/ui/button';
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
                <h1 className='mb-8 text-6xl font-bold'>Laravel chat app</h1>
                <div className='flex gap-2'>
                    <Button size={"lg"} asChild>
                        <Link href='/login'>Login</Link>
                    </Button>
                    <Button size={"lg"} variant={"secondary"} asChild>
                        <Link href='/register'>Signup</Link>
                    </Button>
                </div>
            </GuestLayout>
        </>
    );
}
