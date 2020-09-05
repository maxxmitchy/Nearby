<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
    protected $guarded = [];

    public function restaurant()
    {
        return $this->hasOne(Restaurant::class);
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
