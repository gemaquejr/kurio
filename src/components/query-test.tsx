import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { getHealth } from '@/services/health.service'
import axios from 'axios'

export function QueryTest() {
    const [shouldFail, setShouldFail] = useState(false)

    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['health', shouldFail],
        queryFn: () => getHealth(shouldFail),
        retry: false,
        staleTime: 0,
    })

    return (
        <section className="flex flex-col items-center gap-4 rounded-xl border border-neutral-800 p-6">
            <h2 className="text-xl font-semibold">
                Teste do TanStack Query
            </h2>

            {isPending && (
                <p role="status" className="text-yellow-400">
                    Carregando dados...
                </p>
            )}

            {isError && (
                <p role="alert" className="text-red-400">
                    {axios.isAxiosError(error)
                        ? error.response?.data?.message ?? error.message
                        : error.message}
                </p>
            )}

            {data && !isPending && !isError && (
                <p className="text-green-400">
                    {data.message}
                </p>
            )}

            <div className="flex flex-wrap justify-center gap-3">
                <Button
                    type="button"
                    onClick={() => {
                        setShouldFail(false)
                        void refetch()
                    }}
                >
                    Consultar com sucesso
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setShouldFail(true)
                        void refetch()
                    }}
                >
                    Simular erro
                </Button>
            </div>
        </section>
    )
}