<?php

namespace App\Http\Controllers;

use App\AddOn;
use App\Dish;
use Illuminate\Http\Request;

class AddOnController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $addOns = $request->all();
        foreach ($addOns as $addOn) {
            AddOn::create([
                'dish_id' => $addOn['id'],
                'name' => $addOn['name'],
                'price' => $addOn['price']
            ]);
        }
        return response('success');
    }

    public function show($id)
    {
        $addons = Dish::find($id)->addons()->get();

        return response($addons);
    }

    public function update(Request $request, AddOn $addOn)
    {
        //
    }

    public function destroy(AddOn $addOn)
    {
        //
    }
}
