<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $task_model = new Task();
        $tasks = $task_model->getTask(1);
        return response()->json($tasks);
    }
}
