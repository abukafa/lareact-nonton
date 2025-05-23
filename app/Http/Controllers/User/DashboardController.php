<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movie;

class DashboardController extends Controller
{
    public function index()
    {
        $featuredMovies = Movie::whereIsFeatured(true)->orderBy('id', 'desc')->get();
        $movies = Movie::inRandomOrder()->get();
        return inertia('User/Dashboard/Index', [
            'featuredMovies' => $featuredMovies,
            'movies' => $movies,
        ]);
    }

    public function movieList()
    {
        $movies = Movie::inRandomOrder()->get();
        return inertia('User/MovieList', [
            'movies' => $movies,
        ]);
    }
}
