import { HugeiconsIcon } from "@hugeicons/react";
import { Search01FreeIcons } from "@hugeicons/core-free-icons";

export function Header() {
	return (
		<header className="w-screen bg-zinc-950 flex gap-2 items-center fixed top-0 left-0 m-8 text-zinc-200">
			<HugeiconsIcon
				icon={Search01FreeIcons}
				size={24}
				color="currentColor"
				strokeWidth={1.5}
			/>
			<h1 className="flex font-bold text-2xl items-center">
				Busca<span className="text-emerald-500">CEP</span>
			</h1>
		</header>
	);
}
