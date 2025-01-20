import clsx from "clsx";

type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
};

export default function Bounded({
    as: Comp = "section",
    className,
    children,
    ...restProps
}: BoundedProps) {
    return (
        <>
            <div className="h-2 bg-gradient-to-b from-gray-400 to-transparent"></div>
            <Comp
                className={clsx(
                    "px-8 py-14 first:pt-10 md:px-6 md:py-20 lg:py-24",
                    className,
                )}
                {...restProps}
            >
                <div className="mx-auto flex w-full max-w-full flex-col items-center xl:pl-72 xl:pr-72 md:pl-36 md:pr-36 sm:pl-16 sm:pr-16">
                    {children}
                </div>
            </Comp>
        </>
    );
}