import { CepType } from "@/types/cep";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetCep(cep: string) {
	async function getCep() {
		const { data } = await axios.get<CepType>(
			`https://viacep.com.br/ws/${cep}/json/`,
		);
		return data;
	}

	return useQuery({
		queryKey: ["cep", cep],
		queryFn: getCep,
	});
}
