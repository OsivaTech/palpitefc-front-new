export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
    return (
        <div>
            <h1>404 - Página não encontrada</h1>
            <p>A página que você está procurando não existe.</p>
            <Link href="/">Voltar para a página inicial</Link>
        </div>
    );
};

export default NotFound;