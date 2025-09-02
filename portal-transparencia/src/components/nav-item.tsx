import Link from "next/link";


export default function NavItem({
    href,
  children,
}: Readonly<{ href: string, children: React.ReactNode }>) {
    return (
        <Link href={href} className="flex gap-4 mx-4">
            {children}
        </Link>
    )
}