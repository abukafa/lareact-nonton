import React, { useEffect, useState } from "react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Login({ movies }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        const thumbs = movies.map(movie => `/storage/${movie.thumbnail}`);
        setImages(thumbs);
    }, [movies]);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };
    return (
        <>
            <Head title="Sign Up" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3 flex">
                {/* Kolom gambar */}
                <div className="hidden lg:block w-1/2 h-screen overflow-hidden px-4 py-8">
                    <div className="columns-2 lg:columns-3 gap-2">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt=""
                                className={`rounded-lg w-full object-cover mb-2 ${i % 2 !== 0 || (i == 0 || i == 8) ? 'h-72' : 'h-36'}`}
                                onError={(e) => {
                                    e.target.src = "/images/thumb.jpg";
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Kolom form login */}
                <div className="w-full lg:w-1/2 flex items-center justify-center py-10">
                    <div>
                        <img src="/images/moonton-white.svg" alt="" />
                        <div className="my-10">
                            <ValidationErrors errors={errors} />
                        </div>
                        <form className="w-[370px]" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <Label
                                        forInput="email"
                                        value="Email Address"
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={data.email}
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput="password"
                                        value="Password"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={data.password}
                                        handleChange={onHandleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    processing={processing}
                                >
                                    <span className="text-base font-semibold">
                                        Start Watching
                                    </span>
                                </Button>
                                <Link href={route("register")}>
                                    <Button
                                        type="button"
                                        variant="light-outline"
                                    >
                                        <span className="text-base text-white">
                                            Create New Account
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
