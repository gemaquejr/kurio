import { ChevronRight } from 'lucide-react'

type ProductPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function ProductPagination({
    currentPage,
    totalPages,
    onPageChange,
}: ProductPaginationProps) {
    return (
        <nav aria-label="Paginação dos NFTs">
            <div className="flex items-center justify-end gap-2">
                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1
                    const isActive = currentPage === page

                    return (
                        <button
                            key={page}
                            type="button"
                            aria-label={`Página ${page}`}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() => onPageChange(page)}
                            className={`flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors ${isActive
                                ? 'bg-[#D28A4C] text-[#140D0A]'
                                : 'bg-[#241612] text-[#F5F1EB] hover:bg-[#3A241C]'
                                }`}
                        >
                            {page}
                        </button>
                    )
                })}

                <button
                    type="button"
                    aria-label="Próxima página"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md bg-[#241612] text-[#F5F1EB] transition-colors hover:bg-[#3A241C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </nav>
    )
}