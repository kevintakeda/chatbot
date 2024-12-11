import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { cn } from "@/lib/utils";
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
            <ScrollArea className="h-[calc(100vh-3.5rem)] w-full">
                <ul className="max-w-[40rem] m-auto">
                    {props.messages.map((message) => (
                        <li key={message.id} className={cn("mb-4 p-4 rounded", message.is_system ? "bg-neutral-700" : "border border-solid border-b-neutral-700")}>
                            {message.content}
                        </li>
                    ))}
                </ul>
                <div ref={totemRef} className="h-[calc(80px+2rem)]"></div>
            </ScrollArea>

            <div className="fixed bottom-0 w-full bg-gradient-to-t from-neutral-950 p-8">
                <div className='m-auto max-w-[40rem] h-[80px]'>
                    <Textarea ref={textareaRef} value={data.content} maxLength={2048} disabled={processing} onKeyDown={handleKeydown} onChange={(e) => setData("content", e.currentTarget.value)} placeholder="Type your message here." />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
