import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you're using a utility class merger

interface LoaderProps {
    size?: number;
    color?: string;
    className?: string;
    showText?: boolean;
    text?: string;
    textClassName?: string;
    center?: boolean;
}

const Loader = ({
    size = 24,
    color = 'currentColor',
    className = '',
    showText = true,
    text = 'Loading...',
    textClassName = 'text-sm text-muted-foreground',
    center = false,
}: LoaderProps) => {
    return (
        <div
            className={cn(
                'inline-flex items-center gap-2',
                center && 'fixed inset-0 m-auto h-fit w-fit',
                className
            )}
            aria-label="Loading"
            role="status"
        >
            <Loader2
                className="animate-spin"
                style={{
                    width: size,
                    height: size,
                    color,
                }}
            />

            {showText && (
                <span
                    className={cn(
                        'animate-pulse transition-opacity',
                        textClassName
                    )}
                >
                    {text}
                </span>
            )}
        </div>
    );
};

export default Loader;