import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/Button";
import FlashMessage from "@/Components/FlashMessage";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import Checkbox from "@/Components/Checkbox";
import { Inertia } from '@inertiajs/inertia';

export default function Index({ auth, flashMessage, movies }) {
    const { delete: destroy, put } = useForm();
    return (
        <Authenticated auth={auth}>
            <Head title="List of Movie" />
            <Link href={route("admin.dashboard.movie.create")}>
                <Button type="button" className="w-40 mb-8 px-4">
                    Insert Movie
                </Button>
            </Link>
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}
            <table className="table-fixed w-full text-center">
                <thead>
                    <tr>
                        <th className="w-1/7">No</th>
                        <th className="w-1/7">Image</th>
                        <th className="w-1/3">Name</th>
                        <th className="w-1/5">Category</th>
                        <th className="w-1/7">Rating</th>
                        <th className="w-1/7">Featured</th>
                        <th className="w-1/5" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, i) => (
                        <tr key={movie.id}>
                            <td>{i + 1}</td>
                            <td className="text-center overflow-hidden">
                                <img
                                    src={`/storage/${movie.thumbnail}`}
                                    onError={(e) => { e.target.src = '/images/thumb.jpg' }}
                                    className="object-cover object-center h-10 w-20 rounded-md"
                                    alt=""
                                />
                            </td>
                            <td className="text-left ps-4"> {movie.name}</td>
                            <td className="text-left">{movie.category}</td>
                            <td>{parseFloat(movie.rating).toFixed(1)}</td>
                            <td>
                                <Checkbox
                                    checked={movie.is_featured}
                                    handleChange={() => {
                                        Inertia.post(
                                            route(
                                                "admin.dashboard.movie.update",
                                                movie.id
                                            ),
                                            {
                                                _method: "PUT",
                                                is_featured: !movie.is_featured ? 1 : 0,
                                            }
                                        );
                                        console.log(movie.is_featured);
                                    }}
                                />
                            </td>
                            {!movie.deleted_at ? (
                                <td>
                                    <Link
                                        href={route(
                                            "admin.dashboard.movie.edit",
                                            movie.id
                                        )}
                                    >
                                        <Button type="button" variant="warning">
                                            Edit
                                        </Button>
                                    </Link>
                                </td>
                            ) : null}
                            <td colSpan={
                                movie.deleted_at ? 2 : 1}>
                                <div
                                    onClick={() => {
                                        movie.deleted_at
                                            ? put(
                                                route(
                                                    "admin.dashboard.movie.restore",
                                                    movie.id
                                                )
                                            )
                                            : destroy(
                                                route(
                                                    "admin.dashboard.movie.destroy",
                                                    movie.id
                                                )
                                            );
                                    }}
                                >
                                    <Button type="button" variant={movie.deleted_at ? 'white-outline' : 'danger'}>
                                        {movie.deleted_at
                                            ? "Restore"
                                            : "Delete"}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
