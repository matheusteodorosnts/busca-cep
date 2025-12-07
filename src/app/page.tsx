"use client";

import { Header } from "@/components/Header";
import useGetCep from "@/hooks/useGetCep";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01FreeIcons } from "@hugeicons/core-free-icons";

const formSchema = z.object({
	cep: z
		.string()
		.length(8, "CEP deve ter 8 dígitos")
		.regex(/^\d+$/, "Apenas números")
		.transform((val) => val.replace(/\D/g, "")),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Home() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const cepDigitado = watch("cep");
	const { data } = useGetCep(cepDigitado || "");

	return (
		<div className="flex items-center justify-center min-h-screen px-4">
			<header className="absolute top-0 w-full">
				<Header />
			</header>

			<main className="flex flex-col items-center w-full">
				<h1 className="text-2xl md:text-3xl font-bold text-center px-2">
					Procure o seu <span className="text-emerald-600">CEP</span> pelo
					Brasil todo<span className="text-emerald-600">.</span>
				</h1>

				<form
					onSubmit={handleSubmit((data) => console.log(data))}
					className="flex mt-3 w-full justify-center"
				>
					<div className="relative w-full max-w-[700px]">
						<input
							{...register("cep")}
							placeholder="00000000"
							maxLength={8}
							className="
            bg-zinc-100 text-zinc-950 px-4 py-3 text-lg border rounded-lg
            w-full
            focus:outline-none
          "
						/>

						<button
							type="submit"
							className="
            px-4 md:px-6 py-2 bg-emerald-500 text-emerald-950 rounded-lg cursor-pointer
            absolute right-1 top-1 md:right-2 md:top-2 font-semibold text-sm md:text-base
          "
						>
							Buscar
						</button>
					</div>
				</form>

				<div
					className="
      absolute -bottom-30 bg-zinc-900 rounded-3xl rounded-b-none p-6 md:p-10
      w-full max-w-[890px] min-h-[340px] mx-auto
    "
				>
					<div
						className={`transition-opacity duration-300 gap-6 flex flex-col items-start ${
							data ? "opacity-100" : "opacity-0"
						}`}
					>
						<h1 className="flex items-center gap-2 font-bold text-xl md:text-2xl">
							{data?.cep}
							<HugeiconsIcon
								icon={ArrowRight01FreeIcons}
								size={24}
								color="currentColor"
								strokeWidth={1.5}
							/>
							{data?.uf}
						</h1>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-200">
							<span className="font-medium">Estado: {data?.estado}</span>
							<span className="font-medium">Bairro: {data?.bairro}</span>
							<span className="font-medium">Região: {data?.regiao}</span>
							<span className="font-medium">Rua: {data?.logradouro}</span>
							<span className="font-medium">DDD: {data?.ddd}</span>
							<span className="font-medium">IBGE: {data?.ibge}</span>
						</div>
					</div>

					<Link
						href={`https://www.google.com/maps/search/${data?.cep}`}
						target="_blank"
					>
						<button className="p-2 w-full bg-emerald-500 text-emerald-950 font-semibold rounded-xl cursor-pointer mt-6">
							Ver no mapa
						</button>
					</Link>
				</div>
			</main>
		</div>
	);
}
