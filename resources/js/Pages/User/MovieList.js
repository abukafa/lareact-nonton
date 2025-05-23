import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated/Index";
import MovieCard from "@/Components/MovieCard";

export default function MovieList({ auth, movies }) {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    // Mengelompokkan film berdasarkan kategori
    const groupedMovies = movies.reduce((acc, movie) => {
        if (!acc[movie.category]) {
            acc[movie.category] = [];
        }
        acc[movie.category].push(movie);
        return acc;
    }, {});

    return (
        <Authenticated auth={auth}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
                <title>Categories</title>
            </Head>

            <div>
                {Object.entries(groupedMovies).map(([category, movies]) => (
                    <div className="mb-[50px]" key={category}>
                        <div className="font-semibold text-[22px] text-black mb-4">
                            {category}
                        </div>
                        <div className="grid grid-cols-4 xl:grid-cols-8 gap-y-[30px]">
                            {movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    slug={movie.slug}
                                    name={movie.name}
                                    category={movie.category}
                                    thumbnail={movie.thumbnail}
                                    position="relative"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </Authenticated>
    );
}
