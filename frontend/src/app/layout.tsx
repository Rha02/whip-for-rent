import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'WhipForRent - Rent a car today!',
    description: 'Rent a car today!',
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} w-full h-screen`}>{children}</body>
        </html>
    );
}
