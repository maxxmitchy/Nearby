<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    protected $guarded = [];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }
    public function addons()
    {
        return $this->hasMany(AddOn::class);
    }
}
