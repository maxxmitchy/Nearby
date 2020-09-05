<?php

namespace App\Http\Controllers;

use App\Restaurant;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request, Restaurant $restaurant)
    {
        if (Storage::delete($restaurant->filename)) {
            $restaurant->delete();
        }
        Restaurant::create([
            'user_id' => auth()->id(),
            'marker_id' => auth()->user()->marker->id ?? null,
            'name' => $request->name,
            'address' => $request->address,
            'account_name' => $request->account_name,
            'account_number' => $request->account_number,
            'bank' => $request->bank,
            'min' => $request->min,
            'max' => $request->max,
            'description' => $request->description,
        ]);
        return response(['res' => 'success']);
    }

    public function show(Restaurant $restaurant)
    {
        return response($restaurant->with('categories', 'dishes')->get());
    }

    public function getUserRestaurant()
    {
        $userRestaurant = auth()->user()->restaurant ?
            auth()->user()->restaurant->with('categories')->get() :  "";

        if ($userRestaurant) {
            return response(['hasRestaurant' => true, 'userRestaurant' => $userRestaurant]);
        }
        return response(['hasRestaurant' => false, 'userRestaurant' => ""]);
    }

    public function updateRestaurant(Request $request, Restaurant $restaurant)
    {
        $request->validate([
            'image' => 'required',
            'name' => 'required',
        ]);

        $restaurant->update([
            'image' => $request->image->store('restaurantCoverImage', 'public'),
            'name' => $request->name,
            'address' => $request->address,
            'account_name' => $request->account_name,
            'account_number' => $request->account_number,
            'bank' => $request->bank,
            'min' => $request->min,
            'max' => $request->max,
            'description' => $request->description,
        ]);
        $image = Image::make(public_path('storage/' . $restaurant->image))->fit(300, 200);
        $image->save();
    }

    public function destroy(Restaurant $restaurant)
    {
        //
    }
}
