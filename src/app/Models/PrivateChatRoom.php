<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrivateChatRoom extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user1_id',
        'user2_id',
        // 'project_id',
    ];
}
