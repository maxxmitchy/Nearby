<?php

namespace App\Http\Controllers;

use App\Marker;
use App\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarkerController extends Controller
{
    public function index()
    {
        $latitude = request()->lat;
        $longitude = request()->log;

        $markers = Marker::selectRaw('id,lat,log, ( 6367 * acos( cos( radians( ? ) ) * cos( radians( lat ) ) * cos( radians( log ) - radians( ? ) ) + sin( radians( ? ) ) * sin( radians( lat ) ) ) ) AS distance', [$latitude, $longitude, $latitude])
            ->having('distance', '<', 100)
            ->orderBy('distance')
            ->get();
        $restaurants = [];
        foreach ($markers as $marker) {
            array_push($restaurants, Restaurant::where('marker_id', $marker->id)->with('categories')->get());
        }
        return response(['markers' => $restaurants]);
    }

    public function store()
    {
        Marker::create([
            'user_id' => auth()->id(),
            'lat' => request()->lat,
            'log' => request()->log
        ]);
    }
}
