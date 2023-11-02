import title from "./Title";
import text from "./Text";
import footer from "./Footer";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
    link?: string | null;
    className?: string;
};

function InfoCard({children, link}: Props) {
    const shadredStyles: string = `rounded-xl p-6
    bg-secondary dark:bg-dark-secondary
    shadow-2xl`
    const interactiveStyles: string = `
            shadow-[3px_3px_5px_0px_rgba(0,0,0,0)_inset,-2px_-2px_4px_0px_rgba(0,0,0,0)_inset;]
            hover:shadow-[3px_3px_5px_0px_rgba(0,0,0,0.25)_inset,-2px_-2px_4px_0px_rgba(0,0,0,0.25)_inset;]
            border-4 border-secondary dark:border-dark-secondary
            mb-8
            transition-shadow duration-400 ease-in-out
        `

    return link ? (
        <Link href={link}>
            <div
                className={`${shadredStyles} ${interactiveStyles}`}
            >
                {children}
            </div>
        </Link>
    ) : (
        <div
            className={shadredStyles}
        >
            {children}
        </div>
    );
}

InfoCard.Title = title;
InfoCard.Text = text;
InfoCard.Footer = footer;

export default InfoCard;
