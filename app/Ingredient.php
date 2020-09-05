<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $guarded = [];

    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
