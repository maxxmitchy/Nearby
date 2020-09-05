<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $hidden = [
        'user_id', 'created_at', 'updated_at',
    ];

    protected $guarded = [];

    public function dishes()
    {
        return $this->hasMany(Dish::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function marker()
    {
        return $this->hasOne(Marker::class);
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }
}
