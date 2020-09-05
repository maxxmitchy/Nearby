<?php

namespace App\Http\Controllers;

use App\Dish;
use App\Restaurant;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Intervention\Image\ImageManagerStatic;

class DishController extends Controller
{
    public function index()
    {
        $ownerDishes = auth()->user()->restaurant->dishes()->with('ingredients', 'addons')->get();
        return response($ownerDishes);
    }

    public function store(Request $request)
    {
        $restaurant = Restaurant::findorfail($request->id);

        $request->validate([
            'image' => 'required',
            'name' => 'required',
            'quantity' => 'required',
            'price' => 'required'
        ]);

        $restaurant->dishes()->create([
            'image' => $request->image->store('dishImage', 'public'),
            'name' => $request->name,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'description' => $request->description,
        ]);

        ImageManagerStatic::configure(array('driver' => 'imagick'));

        $image = Image::make(public_path('storage/' . $restaurant->dishes->last()->image))->fit(200, 200);

        $image->save();

        return response('success');
    }

    public function show($id)
    {
        $targteDish = Dish::where('id', $id)->with('ingredients')->get();
        return response($targteDish);
    }

    public function update(Request $request, Dish $dish)
    {
        //
    }

    public function destroy(Dish $dish)
    {
        $dish->delete();

        return response('deleted');
    }
}
