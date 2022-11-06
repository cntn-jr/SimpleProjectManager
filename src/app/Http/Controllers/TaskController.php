<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $task_model = new Task();
        $tasks = $task_model->getTask(1);
        return response()->json($tasks);
    }

    public function store(Request $request){
        $new_task = new Task();
        $new_task->title = $request->title;
        $new_task->due = $request->due;
        $new_task->priority = $request->priority;
        $new_task->description = $request->description;
        $new_task->is_finished = false;
        $new_task->user_id = 1;
        $new_task->save();
    }
}
