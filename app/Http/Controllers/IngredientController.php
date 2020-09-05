<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $ingredients = $request->all();
        if (isset($ingredients[0])) {
            foreach ($ingredients as $ingredient) {
                Ingredient::create([
                    'dish_id' => auth()->user()->restaurant->dishes->last()->id,
                    'name' => $ingredient['name'],
                    'quantity' => $ingredient['quantity']
                ]);
            }
        } else {
            Ingredient::create([
                'dish_id' => $request->id,
                'name' => $request->name,
                'quantity' => $request->quantity
            ]);
        }
        return response('success');
    }

    public function update(Request $request, Ingredient $ingredient)
    {
        foreach ($request->all() as $tarIngredient) {
            $ingredient->update([
                'dish_id' => $tarIngredient['id'],
                'name' => $tarIngredient['name'],
                'quantity' => $tarIngredient['quantity']
            ]);
        }
        return response('update success');
    }

    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();
        return response('success');
    }
}
