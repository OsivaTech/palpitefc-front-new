'use client'
import Link from 'next/link';
import Image from 'next/image';
import UserProfile from '@/components/user-profile';
import HeaderActionsMenu from '@/components/header-actions-menu';
import { useAuth } from '@/context/useAuth';

type HeaderProps = {
    hideActions?: boolean;

}
const Header = ({hideActions}: HeaderProps) => {
    const { isAuthenticated, user } = useAuth()
    
    return (
        <header className="flex items-center justify-between h-[50px] py-2 px-3 bg-[#1C2026]">
            <Link href={'/'}>
                <Image src='/assets/logo.png' alt="" width={205} height={34}  />
            </Link>
            { isAuthenticated ? (
                <UserProfile user={user!} />
            ) : (
                <HeaderActionsMenu />
            )}
        </header>
    );
};

export default Header;