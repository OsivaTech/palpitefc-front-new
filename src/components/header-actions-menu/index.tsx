'use client'
import { Button } from '@/components/ui/button';
import { APP_LINKS } from '@/constants';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

const HeaderActionsMenu: React.FC = () => {
    const { push } = useRouter();
    const locale = useLocale();
    const t = useTranslations();
    return (
        <section className="flex gap-2" >
            <Button onClick={() => push(`/${locale}/${APP_LINKS.SIGNIN()}`)} variant={"outline"} className="text-xs font-bold bg-transparent border border-white h-6 px-2 py-[5px] ">{t('common.signIn')}</Button>
            <Button onClick={() => push(`/${locale}/${APP_LINKS.SIGNUP()}`)} className="text-xs font-bold h-6 px-2 py-[5px]">{t('common.signUp')}</Button>
        </section>
    );
};

export default HeaderActionsMenu;