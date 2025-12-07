import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { queryClient } from "@/utils/react-query";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Busca CEP",
	description:
		"Busca CEP é uma aplicação que permite buscar informações sobre um CEP específico.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${plusJakartaSans.variable}				 antialiased font-[Plus_Jakarta_Sans] bg-zinc-950 text-zinc-100`}
			>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</body>
		</html>
	);
}
