
import { BlogCard } from './blog-card'
import { blogPosts } from './blog-data'

export function Blog() {
    return (
        <section
            id="blog"
            aria-labelledby="blog-title"
            className="mx-auto w-full max-w-300"
        >
            <header className="mb-10 flex flex-col items-center gap-3 text-center">
                <h2
                    id="blog-title"
                    className="text-[28px] leading-9.25 font-bold text-[#F5F1EB]"
                >
                    Diário da Cunhagem
                </h2>

                <p className="text-sm leading-4.5 text-[#CFB28C]">
                    Histórias, guias e insights para colecionadores sobre o
                    universo da propriedade digital.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:justify-items-center">
                {blogPosts.map((post) => (
                    <BlogCard
                        key={post.id}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        readingTime={post.readingTime}
                        image={post.image}
                        imageAlt={post.imageAlt}
                        href={post.href}
                    />
                ))}
            </div>
        </section>
    )
}
