import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from "@/types";
import { Message } from "@/types/models/Message";
import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export interface ChatPageProps {
    messages: Message[]
}

export default function Chat() {
    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    const { props } = usePage<PageProps & ChatPageProps>();

    const scrollPositionRef = useRef(0);
    const totemRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const submit = () => {
        post(route('chat.store'), {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onBefore: () => {
                scrollPositionRef.current = window.scrollY;
            },
            onSuccess: () => {
                reset('content');
            },
            onFinish: () => {
                setTimeout(() => {
                    totemRef.current?.scrollIntoView({ behavior: 'smooth' });
                    textareaRef.current?.focus();
                }, 0)
            },
        });
    };

    const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Chat" />
            <div>
                <ul>
                    {props.messages.map((message) => (
                        <li key={message.id}>
                            {message.content}
                        </li>
                    ))}
                </ul>
                <div ref={totemRef}></div>
            </div>
            <div className='m-auto max-w-[40rem]'>
                <Textarea ref={textareaRef} value={data.content} maxLength={2048} disabled={processing} onKeyDown={handleKeydown} onChange={(e) => setData("content", e.currentTarget.value)} placeholder="Type your message here." />
            </div>
        </AuthenticatedLayout>
    );
}
