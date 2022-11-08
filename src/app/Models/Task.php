<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['title', 'description', 'priority', 'due', 'user_id', 'is_finished'];

    protected $table = 'task';

    function getWarningTask($user_id){
        $tasks = $this
            ->where('user_id', $user_id)
            ->where('is_finished', 0)
            ->where('deleted_at', null)
            ->where(function($query){
                $today = new Carbon('today');
                $next_week = new Carbon('+1 week');
                $query->where('priority', 'high')
                ->orWhereBetween('due', [$today, $next_week]);
            })
            ->get();
        return $tasks;
    }

    function getTask($user_id){
        $tasks = $this
            ->where('user_id', $user_id)
            ->where('is_finished', 0)
            ->where('deleted_at', null)
            ->get();
        return $tasks;
    }
}
