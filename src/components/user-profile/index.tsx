'use client'
import { usePageModal } from '@/context/usePageModal';
import { User } from '@/types/User';
import React from 'react';
import Image from 'next/image';
import { ModalPageProfile } from '@/components/modal-page-profile';

const UserProfile = ({user}: {user:User}) => {
    const { render, openPageModal} = usePageModal();
    
    const handleOpenProfile = () => {
        render(
            <ModalPageProfile user={user} />
        )
        openPageModal();
    }

    return (
        <div onClick={handleOpenProfile} className="flex flex-col justify-center items-center cursor-pointer">
            {user?.team.image && (
                <Image src={user?.team.image} height={20} width={20} alt="" />
            )}
            <span className='font-normal text-xs'>
                {user?.name}
            </span>
        </div>
    );
};

export default UserProfile;