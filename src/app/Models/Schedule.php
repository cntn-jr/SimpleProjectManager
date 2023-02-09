<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'collapsed',
        // 'project_id',
    ];

    public function getSchedules()
    {
        $schedules = $this->select([
            'id',
            'title as name',
            // 'description as content',
            'start_date as start',
            'end_date as end',
            'type',
            'progress'
        ])->get();
        return $schedules;
    }
}
